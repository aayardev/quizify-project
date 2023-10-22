"use client";

import StartQuizCard from "./StartQuizCard";

type Props = {};

const QuizMobileCTL = ({}: Props) => {
  return (
    <div className="fixed right-0 bottom-0 w-screen  md:hidden z-10">
      <StartQuizCard viewport="mobile" />
    </div>
  );
};

export default QuizMobileCTL;
