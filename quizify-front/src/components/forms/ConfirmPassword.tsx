"use client";
import React, { useCallback } from "react";
import Form from "./Form";
import useResetPassword from "@/hooks/use-reset-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import useConfirmPassword from "@/hooks/use-confirm-password";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

type Props = {
  defaultValues: {
    uid: string;
    token: string;
  };
};

const config = [
  {
    name: "new_password1",
    type: "password",
    label: "Password",
  },
  {
    name: "new_password2",
    type: "password",
    label: "Confirm Password",
  },
];

const ConfirmPasswordForm = ({ defaultValues }: Props) => {
  const { toast } = useToast();
  const handleSuccessSubmit = useCallback(() => {
    toast({
      title: "Success",
      description: (
        <p className="text-xs">
          Password has been reset with the new password.{" "}
          <Link href="/auth/login" className="underline underline-offset-2">
            Click here{" "}
          </Link>
          to login to your account.
        </p>
      ),
      variant: "success",
    });
  }, [toast]);

  const { form, onSubmit, isSubmitting } = useConfirmPassword(
    defaultValues,
    handleSuccessSubmit
  );

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2   w-[90vw] max-w-md">
      <Card className="mb-20 ">
        <CardHeader>
          <CardTitle> Quizify 🔥</CardTitle>
          <CardDescription>Confirm your new password.</CardDescription>
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

export default ConfirmPasswordForm;
