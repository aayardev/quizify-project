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

const config = [
  {
    name: "first_name",
    type: "text" as "text",
    label: "First name",
    required: true,
  },
  {
    name: "last_name",
    type: "text" as "text",
    label: "Last name",
    required: true,
  },
  {
    name: "profile_image",
    type: "dropzone" as "dropzone",
    label: "Profile image",
  },
];

type Props = {
  defaultValues: {
    first_name: string;
    last_name: string;
  };
};

const UpdateProfileForm = ({ defaultValues }: Props) => {
  const { form, onSubmit, isSubmitting } = useUpdateProfile(defaultValues);

  return (
    <div>
      <Card className="mb-20 ">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
          <CardDescription>Update your profile here.</CardDescription>
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

export default UpdateProfileForm;
