"use client";

import QuizifyLogo from "@/components/QuizifyLogo";
import ButtonLink from "@/components/ui/button-link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <QuizifyLogo className="fixed top-5 sm:z-10   left-8 " />
      <div className="absolute inset-0 h-scree w-screen flex items-center justify-center">
        <div>
          <h2 className="text-9xl font-bold">404</h2>

          <p className="text-3xl font-medium text-center">Page Not Found</p>

          <div className="flex justify-center gap-x-4 mt-5">
            <ButtonLink href="/" className="font-medium" variant="outline">
              <MoveLeft className="inline-block mr-1.5" /> Go home
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
