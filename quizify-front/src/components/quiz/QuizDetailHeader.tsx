"use client";

import { capitalize } from "@/lib/utils";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { useHover } from "usehooks-ts";
import UserAvatar from "../UserAvatar";
import { Heart } from "lucide-react";
import useLikeQuiz from "@/hooks/use-like-quiz";
import ShareMenu from "@/components/ShareMenu";

type Props = {
  quiz: API.TQuiz;
};

const QuizDetailHeader = ({ quiz }: Props) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { slug } = params;
  const [topic, id] = (slug as string).split("-");
  const color = searchParams.get("color");

  const topicRef = useRef(null);
  const isHover = useHover(topicRef);

  const { likesCount, isLiked, likeId, isLiking, isDisliking, like, dislike } =
    useLikeQuiz(quiz);
  return (
    <div className="mb-4 flex items-start justify-between">
      <div>
        <div className=" w-fit flex justify-between items-start ">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tighter  relative inline-block ">
            A quiz in{" "}
            <Link
              style={{
                color: color!,
                textDecorationStyle: "solid",
                textDecorationLine: isHover ? "underline" : undefined,
                textDecorationThickness: "3px",
              }}
              href={`/topic/${slug}/?color=${color}`}
              ref={topicRef}
            >
              {capitalize(topic)}
            </Link>
          </h2>
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
      <div className="flex items-center gap-x-2.5">
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
            <span>{likesCount}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuizDetailHeader;
