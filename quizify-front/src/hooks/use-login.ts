import { useToast } from "@/components/ui/use-toast";
import { EMAIL_NON_VERIFIED_ERROR_CODE } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, { message: "Email is required" })
    .email({
      message: "Must be a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, { message: "Password is required" }),
});

export default function useLogin(onEmailNotVerified: (email: string) => void) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<API.TCredentials>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "aayar.ismail4@gmail.com",
      password: "Farid1234",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onValid: SubmitHandler<API.TCredentials> = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        let error = JSON.parse(res.error);
        console.log(error);
        if (error?.code && error?.code[0]) {
          if (error.code[0] == EMAIL_NON_VERIFIED_ERROR_CODE) {
            onEmailNotVerified(data.email);
          }
        } else {
          toast({
            title: "Error",
            description: error.non_field_errors,
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const onInvalid: SubmitErrorHandler<API.TCredentials> = (errors) => {
    console.log(errors);
  };

  const onSubmit = form.handleSubmit(onValid, onInvalid);

  return { form, onSubmit, isSubmitting };
}
