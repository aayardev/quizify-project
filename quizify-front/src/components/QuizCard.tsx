"use client";

import { capitalize } from "@/lib/utils";
import { Info, ThumbsUp, User } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import WithTooltip from "@/components/wrappers/withTooltip";
import { useHover } from "usehooks-ts";
import { useRef } from "react";
import Link from "next/link";

type Props = {
  quiz: API.TQuiz;
};

const QuizCard = ({ quiz }: Props) => {
  const titleRef = useRef(null);
  const isHover = useHover(titleRef);
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
              cursor: "pointer",
              textDecorationStyle: "solid",
              textDecorationLine: isHover ? "underline" : undefined,
              textDecorationThickness: "3px",
            }}
            ref={titleRef}
            href={`/quiz/${quiz.topic.name}-${quiz.id}`}
          >
            {capitalize(quiz.topic.name)} #{quiz.id}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-x-1.5">
          <UserAvatar size="sm" user={quiz.created_by} />{" "}
          <span className="text-sm">{quiz.created_by.full_name}</span>
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
          <WithTooltip
            content={
              <div className="flex items-center gap-x-1.5">
                <Info className="h-3.5 w-3.5 " />
                <span>Likes count</span>
              </div>
            }
          >
            <div className="flex items-center gap-x-0.5 ">
              <ThumbsUp className="h-4 w-4 " />
              <span>{quiz.likes_count}</span>
            </div>
          </WithTooltip>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
