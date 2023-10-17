"use client";

import { capitalize } from "@/lib/utils";
import { Heart, Info, ThumbsUp, User } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import WithTooltip from "@/components/wrappers/withTooltip";
import { useHover } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { dislikeQuiz, likeQuiz } from "@/services";
import useLikeQuiz from "@/hooks/use-like-quiz";

type Props = {
  quiz: API.TQuiz;
};

const QuizCard = ({ quiz }: Props) => {
  const titleRef = useRef(null);
  const isHover = useHover(titleRef);

  const { likesCount, isLiked, likeId, isLiking, isDisliking, like, dislike } =
    useLikeQuiz(quiz);
  return (
    <Card
    // style={{
    //   backgroundColor: quiz.topic.color,
    // }}
    >
      <CardHeader>
        <CardTitle>
          <Link
            style={{
              color: quiz.topic.color,
              textDecorationStyle: "solid",
              textDecorationLine: isHover ? "underline" : undefined,
              textDecorationThickness: "3px",
            }}
            ref={titleRef}
            href={`/quiz/${quiz.topic.name}-${
              quiz.id
            }/?color=${encodeURIComponent(quiz.topic.color)}`}
          >
            {capitalize(quiz.topic.name)} #{quiz.id}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-x-1.5">
          <UserAvatar size="sm" user={quiz.created_by} />{" "}
          <span className="text-sm">
            {quiz.created_by.full_name.trim()
              ? quiz.created_by.full_name
              : "Quizify user"}
          </span>
        </div>

        <div className="flex items-center gap-x-2.5">
          <WithTooltip
            content={
              <div className="flex items-center gap-x-1.5">
                <Info className="h-3.5 w-3.5   " />
                <span>Participants count</span>
              </div>
            }
          >
            <div className="flex items-center gap-x-0.5 ">
              <User className="h-4 w-4 " />
              <span>{quiz.participants_count}</span>
            </div>
          </WithTooltip>
          {/* <WithTooltip
            content={
              <div className="flex items-center gap-x-1.5">
                <Info className="h-3.5 w-3.5 " />
                <span>Likes count</span>
              </div>
            }
          ></WithTooltip> */}

          <button
            onClick={() => {
              if (!isLiked) return like();
              if (likeId) dislike();
            }}
            disabled={isLiking || isDisliking}
          >
            <div className="flex items-center gap-x-0.5 ">
              <Heart
                className="h-4 w-4"
                fill={isLiked ? "currentColor" : "none"}
              />
              <span>{likesCount}</span>
            </div>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
