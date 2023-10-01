import { ResetPasswordForm } from "@/components/forms";
import { getServerAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const session = await getServerAuthSession();

  if (session?.user) return redirect("/dashboard");
  return <ResetPasswordForm />;
};

export default Page;
