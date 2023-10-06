import { capitalize } from "@/lib/utils";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import UserAvatar from "./UserAvatar";
import { Info, ThumbsUp, User } from "lucide-react";
import WithTooltip from "./withTooltip";

type Props = {
  quiz: API.TQuiz;
};

const QuizCard = ({ quiz }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {capitalize(quiz.topic.name)} #{quiz.id}
        </CardTitle>
        {/* <CardDescription>
          Test your knowledge of {capitalize(quiz.topic.name)} with these hard
          multiple-choice questions.
        </CardDescription> */}
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
                <Info className="h-3.5 w-3.5 " />
                <span>Participants count</span>
              </div>
            }
          >
            <div className="flex items-center gap-x-0.5">
              <User className="h-4 w-4" />
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
            <div className="flex items-center gap-x-0.5">
              <ThumbsUp className="h-4 w-4" />
              <span>{quiz.likes_count}</span>
            </div>
          </WithTooltip>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
