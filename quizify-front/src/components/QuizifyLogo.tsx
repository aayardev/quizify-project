import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

const QuizifyLogo = ({ className }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "font-bold text-xl py-1 px-2  border-b-4 border-t-2 border-l-2 border-r-4 border-black dark:border-white rounded-lg  transition-all hover:-translate-y-[4px]",
        className
      )}
    >
      <p>Quizify</p>
    </Link>
  );
};

export default QuizifyLogo;
