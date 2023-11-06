import { useToast } from "@/components/ui/use-toast";
import { addServerErrors } from "@/lib/utils";
import { register } from "@/services/auth/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

import { useState } from "react";
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

export const RegisterSchema = z
  .object({
    first_name: z
      .string({
        required_error: "First name is required",
      })
      .min(1, { message: "First name is required" }),
    last_name: z
      .string({
        required_error: "Last name is required",
      })
      .min(1, { message: "Last name is required" }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, { message: "Email is required" })
      .email({
        message: "Must be a valid email",
      }),
    password1: z
      .string({
        required_error: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" }),

    password2: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
  });

export default function useRegister() {
  const { toast } = useToast();

  const form = useForm<API.TRegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const onValid: SubmitHandler<API.TRegisterData> = async (data) => {
    try {
      await register(data);
      setIsSubmitSuccessful(true);
    } catch (err) {
      setIsSubmitSuccessful(false);
      if (axios.isAxiosError(err)) {
        const axsError = err as AxiosError<TAxiosErrorData>;
        if (axsError.response) {
          if (axsError.response.status === 400) {
            const nonFieldErr = axsError.response.data[
              "non_field_errors" as keyof TAxiosErrorData
            ] as string | undefined;
            if (nonFieldErr && nonFieldErr[0]) {
              toast({
                title: "Error",
                description: nonFieldErr,
                variant: "destructive",
              });
              return;
            }
            const backendErrors = axsError.response.data;
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

  const onInvalid: SubmitErrorHandler<API.TCredentials> = (errors) => {
    console.log(errors);
  };

  const onSubmit = form.handleSubmit(onValid, onInvalid);

  console.log(isSubmitSuccessful, "isSubmitSuccessful");

  return { form, onSubmit, isSubmitting, isSubmitSuccessful };
}
