import { useToast } from "@/components/ui/use-toast";
import { addServerErrors } from "@/lib/utils";
import {
  changePassword,
  confirmPassword,
  resetPassword,
} from "@/services/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { type AxiosError } from "axios";
import { useSession } from "next-auth/react";
import {  useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

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

export const ChangePasswordSchema = z
  .object({
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
    old_password: z
      .string({
        required_error: "Old password is required",
      })
      .min(1, { message: "Old password is required" }),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    message: "Passwords don't match",
    path: ["new_password2"],
  });

export default function useChangePassword() {
  const { data: session } = useSession();

  const { toast } = useToast();

  const form = useForm<API.TChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onValid: SubmitHandler<API.TChangePasswordData> = async (data) => {
    try {
      const res = await changePassword(data, {
        headers: {
          Authorization: `Bearer ${session?.access}`,
        },
      });
      toast({
        title: "Success",
        description: res.data.detail,
        variant: "success",
      });
      reset({
        new_password1: "",
        new_password2: "",
        old_password: "",
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

  const onInvalid: SubmitErrorHandler<API.TChangePasswordData> = (errors) => {
    console.log(errors);
  };

  const onSubmit = form.handleSubmit(onValid, onInvalid);

  return { form, onSubmit, isSubmitting };
}
