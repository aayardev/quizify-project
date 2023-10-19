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
import StartQuizCard from "./StartQuizCard";

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

  const { isLiked, likeId, isLiking, isDisliking, like, dislike } =
    useLikeQuiz(quiz);
  return (
    <div className="">
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
            href={`/topic/${quiz.topic.name}-${
              quiz.topic.id
            }/?color=${encodeURIComponent(color ?? "")}`}
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
  );
};

export default QuizDetailHeader;