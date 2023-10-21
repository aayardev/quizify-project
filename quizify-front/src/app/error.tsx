"use client";

import QuizifyLogo from "@/components/QuizifyLogo";
import { Button } from "@/components/ui/button";
import ButtonLink from "@/components/ui/button-link";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <QuizifyLogo className="fixed top-5 sm:z-10   left-8 " />
      <div className="absolute inset-0 h-scree w-screen flex items-center justify-center">
        <div>
          <h2 className="text-3xl font-medium">Something went wrong!</h2>

          <div className="flex justify-center gap-x-4 mt-5">
            <Button onClick={() => reset()}>Try again</Button>
            <ButtonLink href="/" className="font-medium" variant="outline">
              <MoveLeft className="inline-block mr-1.5" /> Go home
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
