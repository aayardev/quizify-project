"use client";

import useLogin from "@/hooks/use-login";
import React, { useCallback } from "react";
import Form from "./Form";
import VerifyEmailError from "../VerifyEmailError";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import SignInButton from "../SignInButton";
import { Separator } from "../ui/separator";

const config = [
  {
    name: "email",
    type: "email" as "email",
    label: "Email",
  },
  {
    name: "password",
    type: "password" as "password",
    label: "Password",
    description: (
      <Link href="/reset-password/" className="underline underline-offset-2">
        Forgot your password?
      </Link>
    ),
  },
];

const LoginForm = () => {
  const { toast } = useToast();
  const onEmailNotVerifiedHandler = useCallback(
    (email: string) => {
      toast({
        title: "E-mail is not verified.",
        description: <VerifyEmailError email={email} />,
        variant: "destructive",
      });
    },
    [toast]
  );
  const { form, onSubmit, isSubmitting } = useLogin(onEmailNotVerifiedHandler);

  return (
    <>
      <Form
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        config={config}
      />
      <div className="flex items-center gap-x-4 my-5">
        <Separator className="flex-1" />{" "}
        <span className="text-muted-foreground">Or</span>{" "}
        <Separator className="flex-1" />
      </div>

      <div className=" flex gap-3 justify-center">
        <SignInButton provider="google">Sign in with Google</SignInButton>
        <SignInButton provider="facebook">Sign in with Facebook</SignInButton>
      </div>
    </>
  );
};

export default LoginForm;
