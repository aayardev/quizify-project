import { useToast } from "@/components/ui/use-toast";
import { addServerErrors } from "@/lib/utils";
import { confirmPassword, resetPassword } from "@/services/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormSetError,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type TAxiosErrorData =
  | {
      [P in keyof API.TRegisterData]: string[];
    }
  | {
      non_field_errors: string[];
    };

type TDefaultValues = {
  uid: string;
  token: string;
};

export const ConfirmPasswordSchema = z
  .object({
    uid: z.string(),
    token: z.string(),
    new_password1: z
      .string({
        required_error: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" }),

    new_password2: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords don't match",
    path: ["new_password2"],
  });

export default function useConfirmPassword(
  defaultValues: TDefaultValues,
  onSuccessSubmit: () => void
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<API.TUpdateUserProfileData & TDefaultValues>({
    resolver: zodResolver(ConfirmPasswordSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onValid: SubmitHandler<API.TUpdateUserProfileData> = async (data) => {
    try {
      const res = await confirmPassword(data);
      toast({
        title: "Success",
        description: res.data.detail,
        variant: "success",
      });

      onSuccessSubmit();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axsError = err as AxiosError<TAxiosErrorData>;
        if (axsError.response) {
          if (axsError.response.status === 400) {
            const nonFieldErr = axsError.response.data[
              "non_field_errors" as keyof TAxiosErrorData
            ] as string | undefined;

            const tokenOrUidErr = (axsError.response.data[
              "token" as keyof TAxiosErrorData
            ] || axsError.response.data["uid" as keyof TAxiosErrorData]) as
              | string
              | undefined;
            if (nonFieldErr && nonFieldErr[0]) {
              // Set non field errors
              toast({
                title: "Error",
                description: nonFieldErr,
                variant: "destructive",
              });
              return;
            }

            if (tokenOrUidErr && tokenOrUidErr[0]) {
              toast({
                title: "Error",
                description: "Confirmation password link is expired.",
                variant: "destructive",
              });
              return;
            }

            const backendErrors = axsError.response.data;
            // Set errors for fields
            addServerErrors<TAxiosErrorData>(
              backendErrors,
              form.setError as UseFormSetError<TAxiosErrorData>
            );
          } else {
            toast({
              title: "Error",
              description: "Something went wrong. Please try again later.",
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const onInvalid: SubmitErrorHandler<API.TUpdateUserProfileData> = (
    errors
  ) => {
    console.log(errors);
  };

  const onSubmit = form.handleSubmit(onValid, onInvalid);

  return { form, onSubmit, isSubmitting };
}
