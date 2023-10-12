import ConfirmPasswordForm from "@/components/forms/ConfirmPassword";
import React from "react";

type Props = {
  params: {
    uid: string;
    token: string;
  };
};

const page = ({ params }: Props) => {
  return <ConfirmPasswordForm defaultValues={params} />;
};

export default page;
