"use client";

import { useLikeStore } from "@/hooks/use-like-quiz";
import StartQuizCard from "./StartQuizCard";

type Props = {
  quiz: API.TQuiz;
};

const QuizMobileCTL = ({ quiz }: Props) => {
  const { getLikeCount } = useLikeStore();
  return (
    <div className="fixed right-0 bottom-0 w-screen  md:hidden z-10">
      <StartQuizCard
        participants_count={quiz.participants_count}
        likes_count={getLikeCount(quiz.id)}
        is_played={quiz.is_played}
        viewport="mobile"
      />
    </div>
  );
};

export default QuizMobileCTL;
