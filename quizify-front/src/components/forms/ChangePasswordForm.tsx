"use client";
import useUpdateProfile from "@/hooks/use-update-profile";
import Dropzone from "../Dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Form from "./Form";
import useChangePassword from "@/hooks/use-change-password";

const config = [
  {
    name: "new_password1",
    type: "password" as "password",
    label: "New password",
    // required: true,
  },
  {
    name: "new_password2",
    type: "password" as "password",
    label: "Confirm new password",
    // required: true,
  },
  {
    name: "old_password",
    type: "password" as "password",
    label: "Old password",
    // required: true,
  },
];

const ChangePasswordForm = () => {
  const { form, onSubmit, isSubmitting } = useChangePassword();

  return (
    <div>
      <Card className="mb-20 ">
        <CardHeader>
          <CardTitle className="text-xl">Password</CardTitle>
          <CardDescription>Update your password here.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            config={config}
            btnPosition="right"
            className="max-w-lg p-6 pt-0"
            btnContainerClassname="bg-slate-50 dark:bg-slate-900 py-4 pr-5"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
