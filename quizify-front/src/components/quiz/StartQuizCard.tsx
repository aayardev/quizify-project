"use client";

import { Heart, User } from "lucide-react";
import { useParams } from "next/navigation";
import ButtonLink from "../ui/button-link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";

type Props = {
  viewport: "mobile" | "desktop";
};
const StartQuizCard = ({ viewport = "desktop" }: Props) => {
  const params = useParams();
  const { slug } = params;
  const [topic, quiz] = (slug as string).split("-");
  return (
    <Card
      className={`${
        viewport === "desktop" ? "w-60" : "rounded-none border-x-0	"
      }`}
    >
      {viewport === "desktop" ? <CardHeader /> : null}

      <CardContent
        className={`${
          viewport === "mobile"
            ? "flex justify-between items-center py-6 px-10"
            : ""
        }`}
      >
        <div className="flex  justify-center gap-x-8 ">
          <div className="flex flex-col items-center justify-center">
            <User className="h-5 w-5 mb-1" />
            <span className="text-sm">10</span>
          </div>
          <div className="h-10">
            <Separator orientation="vertical" className="w-px" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-sm">10</span>
          </div>
        </div>
        <ButtonLink
          href={`/quiz/${topic}-${quiz}/play`}
          className={`${viewport === "desktop" ? "w-full mt-4" : "w-28"}`}
        >
          Play
        </ButtonLink>
      </CardContent>

      {viewport === "desktop" ? <CardFooter /> : null}
    </Card>
  );
};

export default StartQuizCard;
