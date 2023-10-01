import { getServerAuthSession } from "@/lib/next-auth";

import { redirect } from "next/navigation";
import SignInButton from "@/components/SignInButton";
import LoginCard from "@/components/LoginCard";
import QuizifyLogo from "@/components/QuizifyLogo";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user) return redirect("/u/dashboard");
  return (
    <div className="absolute w-full h-full bg-white inset-0 z-20 bg-qst-mark-pattern bg-cover">
      <div className="w-full h-full backdrop-blur-md bg-gray-200/50" />
      <QuizifyLogo className="absolute top-5 left-8" />
      <LoginCard />
    </div>
  );
}
