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
import { SocialIcon } from "react-social-icons";
import { Separator } from "../ui/separator";

type Props = {};

const config = [
  {
    name: "first_name",
    type: "text" as "text",
    label: "First name",
  },
  {
    name: "last_name",
    type: "text" as "text",
    label: "Last name",
  },
  {
    name: "email",
    type: "text" as "text",
    label: "Email",
  },
  {
    name: "password1",
    type: "password" as "password",
    label: "Password",
  },
  {
    name: "password2",
    type: "password" as "password",
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
    <div className=" my-12  w-[90vw] max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Quizify 🔥</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link className="underline underline-offset-2" href="/login">
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

          <div className="flex items-center gap-x-4 my-5">
            <Separator className="flex-1" />{" "}
            <span className="text-muted-foreground">Or</span>{" "}
            <Separator className="flex-1" />
          </div>

          <div className=" flex gap-3 justify-center flex-wrap sm:flex-nowrap">
            <SignInButton provider="google" className="whitespace-nowrap	">
              <SocialIcon
                as="div"
                network="google"
                className="!h-5 !w-5 mr-1.5"
              />
              Sign up with Google
            </SignInButton>
            <SignInButton provider="github" className="whitespace-nowrap	">
              <SocialIcon
                as="div"
                network="github"
                className="!h-5 !w-5 mr-1.5"
              />
              Sign up with Github
            </SignInButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
