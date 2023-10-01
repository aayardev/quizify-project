"use client";
import useRegister from "@/hooks/use-register";
import React, { useCallback } from "react";
import Form from "./Form";
import SignInButton from "../SignInButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "../ui/card";
import { resendVerificationEmail } from "@/services/auth/api";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

type Props = {};

const config = [
  {
    name: "first_name",
    type: "text",
    label: "First name",
  },
  {
    name: "last_name",
    type: "text",
    label: "Last name",
  },
  {
    name: "email",
    type: "text",
    label: "Email",
  },
  {
    name: "password1",
    type: "password",
    label: "Password",
  },
  {
    name: "password2",
    type: "password",
    label: "Confirm Password",
  },
];

const RegisterForm = (props: Props) => {
  const { form, onSubmit, isSubmitting, isSubmitSuccessful } = useRegister();
  const { toast } = useToast();
  const resendEmailHandler = useCallback(async () => {
    const email = form.getValues("email");
    try {
      const res = await resendVerificationEmail({ email });
      toast({
        title: "Email was sent!",
        description: (
          <p className="text-xs">{`Email verification was sent to ${email}.`}</p>
        ),
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error was occured. Please try again",
        variant: "destructive",
      });
    }
  }, [form, toast]);

  if (isSubmitSuccessful) {
    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Verify your email address
          </CardTitle>
          <CardDescription className="!mt-5">
            We’ve sent an email to verify your email address. You should click
            the link in that email to verify your account.
          </CardDescription>

          <CardDescription className="!mt-4">
            <button className="underline" onClick={resendEmailHandler}>
              Click here
            </button>{" "}
            if you did not receive an email.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="my-28 w-[90vw] max-w-md">
      <Card className="mb-20 ">
        <CardHeader>
          <CardTitle>Quizify 🔥</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link className="underline underline-offset-2" href="/auth/login">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            config={config}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
