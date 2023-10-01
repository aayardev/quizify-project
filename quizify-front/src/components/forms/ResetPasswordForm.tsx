"use client";
import React from "react";
import Form from "./Form";
import useResetPassword from "@/hooks/use-reset-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {};

const config = [
  {
    name: "email",
    type: "text" as "text",
    label: "Email",
  },
];

const ResetPasswordForm = (props: Props) => {
  const { form, onSubmit, isSubmitting } = useResetPassword();
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2   w-[90vw] max-w-md">
      <Card className="mb-20 ">
        <CardHeader>
          <CardTitle> Quizify 🔥</CardTitle>
          <CardDescription>Reset your password.</CardDescription>
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

export default ResetPasswordForm;
