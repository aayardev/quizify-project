"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import QuizifyLogo from "./QuizifyLogo";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import { buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Notifications from "./Notifications";
import ButtonLink from "./ui/button-link";
import useMediaQuery from "@/hooks/use-media-query";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session, status } = useSession();
  const { sm } = useMediaQuery();

  return (
    <header className=" fixed inset-0 top-0 left-0 bg-white dark:bg-gray-950  border-b h-fit py-2 border-zinc-200 z-10">
      <div className="flex items-center justify-between h-full mx-auto max-w-7xl px-8 ">
        <QuizifyLogo />

        <div className="flex items-center gap-x-3">
          {session?.user ? (
            <>
              <ButtonLink href="/quiz" size={sm ? "icon" : "default"}>
                <Plus className="w-4 h-4 mr-1 inline-block" />
                <span className="hidden sm:inline"> New quizz</span>
              </ButtonLink>
              <Notifications />
            </>
          ) : null}

          <ModeToggle />
          {status === "loading" ? (
            <Skeleton className="h-10 w-10 rounded-full flex dark:bg-white" />
          ) : (
            <>
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton>Sign in</SignInButton>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
