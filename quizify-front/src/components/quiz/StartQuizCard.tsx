"use client";

import { Heart, Info, Medal, User } from "lucide-react";
import { useParams } from "next/navigation";
import ButtonLink from "../ui/button-link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import WithTooltip from "../wrappers/withTooltip";
import { retrieveQuiz } from "@/services";
import { useQuery } from "react-query";

type Props = {
  viewport: "mobile" | "desktop";
  quiz: API.TQuiz;
};
const StartQuizCard = ({ viewport = "desktop", quiz }: Props) => {
  return (
    <Card
      className={`${
        viewport === "desktop" ? "w-fit px-7" : "rounded-none border-x-0	"
      }`}
    >
      {viewport === "desktop" ? <CardHeader /> : null}

      <CardContent
        className={`${
          viewport === "mobile"
            ? "flex justify-between items-center flex-wrap py-6 px-10 gap-x-4"
            : ""
        }`}
      >
        <div className="flex  justify-center gap-x-8 mx-auto sm:mx-0 pt-4 ">
          <WithTooltip
            content={
              <div className="flex items-center gap-x-1.5">
                <Info className="h-3.5 w-3.5   " />
                <span>Participants count</span>
              </div>
            }
          >
            <div className="flex flex-col items-center justify-center">
              <User className="h-5 w-5 mb-1" />
              <span className="text-sm">{quiz?.participants_count}</span>
            </div>
          </WithTooltip>
          <div className="h-10">
            <Separator orientation="vertical" className="w-px" />
          </div>

          <WithTooltip
            content={
              <div className="flex items-center gap-x-1.5">
                <Info className="h-3.5 w-3.5   " />
                <span>Likes count</span>
              </div>
            }
          >
            <div className="flex flex-col items-center justify-center">
              <Heart className="h-5 w-5 mb-1" />
              <span className="text-sm">{quiz?.likes_count}</span>
            </div>
          </WithTooltip>

          {quiz?.is_played ? (
            <>
              <div className="h-10">
                <Separator orientation="vertical" className="w-px" />
              </div>

              <WithTooltip
                content={
                  <div className="flex items-center gap-x-1.5">
                    <Info className="h-3.5 w-3.5   " />
                    <span>
                      You got <span>{quiz?.score}/5</span> in your last try.
                    </span>
                  </div>
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <Medal className="h-5 w-5 mb-1" />
                  <span className="text-sm">{quiz?.score}/5</span>
                </div>
              </WithTooltip>
            </>
          ) : null}
        </div>
        <div className="flex items-center   pt-4 gap-x-2 mx-auto sm:mx-0   ">
          <ButtonLink
            href={`/quiz/${quiz?.topic?.name}-${quiz?.id}/play`}
            className={`${viewport === "desktop" ? "w-full " : "w-28"}`}
          >
            {quiz?.is_played ? "Retry" : "Play"}
          </ButtonLink>
        </div>
      </CardContent>

      {viewport === "desktop" ? <CardFooter /> : null}
    </Card>
  );
};

export default StartQuizCard;
