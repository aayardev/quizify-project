import { useToast } from "@/components/ui/use-toast";
import { addServerErrors } from "@/lib/utils";
import { resetPassword } from "@/services/auth/api";
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

export const ResetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, { message: "Email is required" })
    .email({
      message: "Must be a valid email",
    }),
});

export default function useResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<API.TResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onValid: SubmitHandler<API.TResetPasswordData> = async (data) => {
    try {
      const res = await resetPassword(data);
      toast({
        title: "Success",
        description: res.data.detail,
        variant: "success",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axsError = err as AxiosError<TAxiosErrorData>;
        if (axsError.response) {
          if (axsError.response.status === 400) {
            const nonFieldErr = axsError.response.data[
              "non_field_errors" as keyof TAxiosErrorData
            ] as string | undefined;
            if (nonFieldErr && nonFieldErr[0]) {
              // Set non field errors
              toast({
                title: "Error",
                description: nonFieldErr,
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

  const onInvalid: SubmitErrorHandler<API.TResetPasswordData> = (errors) => {
    console.log(errors);
  };

  const onSubmit = form.handleSubmit(onValid, onInvalid);

  return { form, onSubmit, isSubmitting };
}
