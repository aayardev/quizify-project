"use client";

import { Heart, Info, Medal, User } from "lucide-react";
import { useParams } from "next/navigation";
import ButtonLink from "../ui/button-link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import WithTooltip from "../wrappers/withTooltip";

type Props = {
  viewport: "mobile" | "desktop";
  likes_count: number;
  participants_count: number;
  is_played: boolean;
  score?: number;
};
const StartQuizCard = ({
  viewport = "desktop",
  participants_count,
  likes_count,
  is_played,
  score = 0,
}: Props) => {
  const params = useParams();
  const { slug } = params;
  const [topic, quiz] = (slug as string).split("-");
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
            ? "flex justify-between items-center flex-wrap py-6 px-10"
            : ""
        }`}
      >
        <div className="flex  justify-center gap-x-8 mx-auto sm:mx-0 ">
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
              <span className="text-sm">{participants_count}</span>
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
              <span className="text-sm">{likes_count}</span>
            </div>
          </WithTooltip>

          {is_played ? (
            <>
              <div className="h-10">
                <Separator orientation="vertical" className="w-px" />
              </div>

              <WithTooltip
                content={
                  <div className="flex items-center gap-x-1.5">
                    <Info className="h-3.5 w-3.5   " />
                    <span>
                      You got <span>{score}/5</span> in your last try.
                    </span>
                  </div>
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <Medal className="h-5 w-5 mb-1" />
                  <span className="text-sm">{score}/5</span>
                </div>
              </WithTooltip>
            </>
          ) : null}
        </div>
        <div className="flex items-center mt-4 sm:mt-0 md:mt-4 gap-x-2 mx-auto sm:mx-0   ">
          <ButtonLink
            href={`/quiz/${topic}-${quiz}/play`}
            className={`${viewport === "desktop" ? "w-full " : "w-28"}`}
          >
            {is_played ? "Retry" : "Play"}
          </ButtonLink>
        </div>
      </CardContent>

      {viewport === "desktop" ? <CardFooter /> : null}
    </Card>
  );
};

export default StartQuizCard;
