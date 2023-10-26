"use client";

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";
import { useHover } from "usehooks-ts";
import UserAvatar from "../UserAvatar";
import ShareMenu from "../ShareMenu";
import useLikeQuiz from "@/hooks/use-like-quiz";
import { Heart } from "lucide-react";

type Props = {
  quiz: API.TQuiz;
};

const QuizDetailHeader = ({ quiz }: Props) => {
  const topicRef = useRef(null);
  const isHover = useHover(topicRef);
  const { isLiked, likeId, isLiking, isDisliking, like, dislike } =
    useLikeQuiz(quiz);

  return (
    <div>
      <div className=" flex justify-between items-start ">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter  relative inline-block ">
          A quiz about{" "}
          <Link
            style={{
              color: quiz.topic.color,
              textDecorationStyle: "solid",
              textDecorationLine: isHover ? "underline" : undefined,
              textDecorationThickness: "3px",
            }}
            href={`/topic/${quiz.topic.name}-${
              quiz.topic.id
            }/?color=${encodeURIComponent(quiz.topic.color)}`}
            ref={topicRef}
          >
            {capitalize(quiz.topic.name)}
          </Link>
        </h2>

        <div className="flex items-center justify-end gap-x-2.5 mb-4 md:hidden">
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
      </div>
      <div className="flex items-center gap-x-1.5 mt-2.5">
        <UserAvatar size="sm" user={quiz.created_by} />{" "}
        <span className="text-sm">
          {quiz.created_by.full_name.trim()
            ? quiz.created_by.full_name
            : "Quizify user"}
        </span>
      </div>
    </div>
  );
};

export default QuizDetailHeader;
