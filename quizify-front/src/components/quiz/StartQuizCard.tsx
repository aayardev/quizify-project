import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Heart, User } from "lucide-react";
import ButtonLink from "../ui/button-link";

type Props = {
  quiz: API.TQuiz;
};
const StartQuizCard = ({ quiz }: Props) => {
  return (
    <Card className="w-60">
      <CardHeader></CardHeader>
      <CardContent className="text-center">
        <div className="flex  justify-center gap-x-8 mb-4">
          <div>
            <User className="h-5 w-5 mb-1" />
            <span className="text-sm">10</span>
          </div>
          <div className="h-10">
            <Separator orientation="vertical" className="w-px" />
          </div>

          <div>
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-sm">10</span>
          </div>
        </div>
        <ButtonLink href="/start" className="w-full">
          Start
        </ButtonLink>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default StartQuizCard;
