import { RegisterForm } from "@/components/forms";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerAuthSession();

  if (session?.user) return redirect("/");
  return <RegisterForm />;
};

export default Page;
