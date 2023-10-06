"use client";

import React, { useEffect } from "react";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import ModeToggle from "./ModeToggle";
import QuizifyLogo from "./QuizifyLogo";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { redirect } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <header className=" fixed inset-0 top-0 left-0 bg-white dark:bg-gray-950  border-b h-fit py-2 border-zinc-200 z-10">
      <div className="flex items-center justify-between h-full mx-auto max-w-7xl px-8 ">
        <QuizifyLogo />

        <div className="flex items-center gap-x-3">
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
