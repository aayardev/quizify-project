"use client";

import { signIn } from "next-auth/react";
import { useCallback } from "react";

import { Button, ButtonProps } from "./ui/button";
import { type OAuthProviderType } from "next-auth/providers/oauth-types";

type Props = {
  provider?: OAuthProviderType;
};

const SignInButton = ({
  children,
  provider,
  ...props
}: ButtonProps & Props) => {
  const handleClick = useCallback(async () => {
    try {
      await signIn(provider);
    } catch (err) {
      console.error(err);
    }
  }, [provider]);
  return (
    <Button {...props} onClick={handleClick} className="relative ">
      {children}
    </Button>
  );
};

export default SignInButton;
