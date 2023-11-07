"use client";
import React from "react";
import ShareMenu from "../ShareMenu";
import useLikeQuiz from "@/hooks/use-like-quiz";
import { Heart } from "lucide-react";
import StartQuizCard from "./StartQuizCard";
import { retrieveQuiz } from "@/services";
import { useQuery } from "react-query";

type Props = {
  quiz: API.TQuiz;
};

const QuizSidebar = ({ quiz: initialQuiz }: Props) => {
  const { data: quiz } = useQuery({
    queryKey: ["quiz-detail", initialQuiz.id],
    queryFn: async () => {
      const res = retrieveQuiz(initialQuiz.id);
      return (await res).data;
    },
    initialData: initialQuiz,
  });
  const { isLiked, likeId, isLiking, isDisliking, like, dislike } = useLikeQuiz(
    quiz!
  );
  return (
    <div className="sticky right-0 top-24 hidden md:block">
      <div className="flex items-center justify-end gap-x-2.5 mb-4">
        <ShareMenu />
        <button
          onClick={() => {
            if (!isLiked) return like();
            if (likeId) dislike();
          }}
          disabled={isLiking || isDisliking}
        >
          <div className="flex items-center gap-x-1 ">
            <Heart
              className="h-4 w-4"
              fill={isLiked ? "currentColor" : "none"}
            />
            <span className="text-sm text-bold">Like</span>
          </div>
        </button>
      </div>
      <StartQuizCard quiz={quiz!} viewport="desktop" />
    </div>
  );
};

export default QuizSidebar;
