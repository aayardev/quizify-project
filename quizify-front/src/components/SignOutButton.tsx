"use client";
import React, { useCallback } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

type Props = {};

const SignOutButton = (props: Props) => {
  const handleOnClick = useCallback(() => signOut(), []);
  return <Button onClick={handleOnClick}>Sign out</Button>;
};

export default SignOutButton;
