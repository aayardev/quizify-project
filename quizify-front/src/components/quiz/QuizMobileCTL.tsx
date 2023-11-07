"use client";

import { retrieveQuiz } from "@/services";
import StartQuizCard from "./StartQuizCard";
import { useQuery } from "react-query";

type Props = {
  quiz: API.TQuiz;
};

const QuizMobileCTL = ({ quiz: initialQuiz }: Props) => {
  const { data: quiz } = useQuery({
    queryKey: ["quiz-detail", initialQuiz.id],
    queryFn: async () => {
      const res = retrieveQuiz(initialQuiz.id);
      return (await res).data;
    },
    initialData: initialQuiz,
  });

  return (
    <div className="fixed right-0 bottom-0 w-screen  md:hidden z-10">
      <StartQuizCard quiz={quiz!} viewport="mobile" />
    </div>
  );
};

export default QuizMobileCTL;
