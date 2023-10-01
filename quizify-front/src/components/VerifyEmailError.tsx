"use client";
import { resendVerificationEmail } from "@/services/auth/api";
import React, { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  email: string;
};

const VerifyEmailError = ({ email }: Props) => {
  const { toast } = useToast();
  const resendEmailHandler = useCallback(async () => {
    try {
      const res = await resendVerificationEmail({ email });
      toast({
        title: "Email was sent!",
        description: (
          <p className="text-xs">{`Email verification was sent to ${email}.`}</p>
        ),
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "An error was occured. Please try again",
        variant: "destructive",
      });
    }
  }, [email, toast]);

  return (
    <div className="text-xs">
      Please check your email or{" "}
      <button className="underline" onClick={resendEmailHandler}>
        click here
      </button>{" "}
      to resend email verification.
    </div>
  );
};

export default VerifyEmailError;
