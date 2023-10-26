import QuizifyLogo from "@/components/QuizifyLogo";
import { LoginForm } from "@/components/forms";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/next-auth";
import React from "react";
import Link from "next/link";

type Props = {};

const LoginPage = async (props: Props) => {
  const session = await getServerAuthSession();

  console.log(session);

  if (session?.user) return redirect("/");
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   w-[90vw] max-w-fit">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Quizify</CardTitle>
          <CardDescription>
            First time here?{" "}
            <Link className="underline underline-offset-2" href="/register">
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
