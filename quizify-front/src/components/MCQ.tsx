"use client";
import useCountupTimer from "@/hooks/useCountupTimer";
import { Game, Question } from "@prisma/client";
import { ChevronRight, Timer } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import useKeyPress from "@/hooks/useKeyPress";
import { useMutation } from "react-query";
import axios from "axios";
import { TCheckAnswerSchema } from "@/schemas/questions";
import MCQCounter from "./MCQCounter";
import { useToast } from "./ui/use-toast";

type TQuestions = Pick<Question, "id" | "question" | "options">[];

type MCQProps = {
  game: Game & {
    questions: TQuestions;
  };
};

type TQstAnswer = {
  qst: string;
  selectedAnswer: number;
};

type TPressedKey = "down" | "up" | "left" | "right" | "1" | "2" | "3" | "4";

const MCQ = ({ game }: MCQProps) => {
  const { toast } = useToast();
  const { seconds, minutes, hours, startTimer } = useCountupTimer();

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   Answers

  const [userQstAnswers, setUserQstAnswers] = useState<TQstAnswer[]>([]);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  useEffect(() => {
    setUserQstAnswers(
      game.questions.map((qst) => ({
        qst: qst.id,
        selectedAnswer: 0,
      }))
    );
  }, [game.questions]);

  // Check answers

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async (data: TCheckAnswerSchema) => {
      const response = await axios.post("/api/checkAnswer", data);
      return response.data;
    },
  });

  //   Questions
  const [currentQstIndex, setCurrentQstIndex] = useState(0);
  const noMoreQsts = currentQstIndex === game.questions.length;
  console.log(currentQstIndex, game.questions.length, " game.questions.length");

  const currentQst = game.questions[currentQstIndex];
  const qstOptions: string[] = useMemo(() => {
    return noMoreQsts ? [] : JSON.parse(currentQst.options as string);
  }, [currentQst?.options, noMoreQsts]);

  const getSelectedAnswer = useCallback(() => {
    return userQstAnswers.find((qst) => qst.qst === currentQst.id)
      ?.selectedAnswer;
  }, [userQstAnswers, currentQst]);

  const getCurrentQstAnswer = useCallback(() => {
    console.log("getCurrentQstAnswer", userQstAnswers, currentQst);
    return userQstAnswers.find((qst) => qst.qst === currentQst.id);
  }, [userQstAnswers, currentQst]);

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      const currentQstAnswer = getCurrentQstAnswer();
      if (currentQstAnswer) {
        const newUserQstAnswers = userQstAnswers.map((qst) =>
          qst.qst === currentQstAnswer.qst
            ? { ...qst, selectedAnswer: answerIndex }
            : qst
        );
        setUserQstAnswers(newUserQstAnswers);
      }
    },
    [userQstAnswers, getCurrentQstAnswer]
  );

  const onKeyPress = useCallback(
    (key: TPressedKey) => {
      const currentQstAnswer = getCurrentQstAnswer();
      console.log(currentQstAnswer, "currentQstAnswer");
      if (!currentQstAnswer) return;

      if (
        key === "down" &&
        currentQstAnswer.selectedAnswer + 1 < qstOptions.length
      ) {
        selectAnswer(currentQstAnswer.selectedAnswer + 1);
      } else if (key === "up" && currentQstAnswer.selectedAnswer > 0) {
        selectAnswer(currentQstAnswer.selectedAnswer - 1);
      }
      // } else if (key === "right") {
      //   goToNextQst();
      // } else if (key === "left") {
      //   goToPrevQst();
      // }
      else {
        console.log(key, "key");
        selectAnswer(+key - 1);
      }
    },
    [
      qstOptions.length,
      getCurrentQstAnswer,
      selectAnswer,
      // goToNextQst,
      // goToPrevQst,
    ]
  );

  useKeyPress("ArrowUp", () => onKeyPress("up"));
  useKeyPress("ArrowDown", () => onKeyPress("down"));
  // useKeyPress("ArrowRight", () => onKeyPress("right"));
  // useKeyPress("ArrowLeft", () => onKeyPress("left"));
  useKeyPress("1", () => onKeyPress("1"));
  useKeyPress("2", () => onKeyPress("2"));
  useKeyPress("3", () => onKeyPress("3"));
  useKeyPress("4", () => onKeyPress("4"));

  const goToNextQst = useCallback(() => {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer === undefined) return;
    checkAnswer(
      {
        questionId: currentQst.id,
        userInput: qstOptions[selectedAnswer],
      },
      {
        onSuccess: ({ isCorrect }) => {
          if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
            toast({
              title: "Correct",
              description: "You got it right!",
              variant: "success",
            });
          } else {
            setWrongAnswers((prev) => prev + 1);
            toast({
              title: "Incorrect",
              description: "You got it wrong!",
              variant: "destructive",
            });
          }
        },
        onError: (error) => console.log(error),
        onSettled: () => {
          if (noMoreQsts) return;
          setCurrentQstIndex((prevQst) => prevQst + 1);
        },
      }
    );
  }, [
    currentQst,
    checkAnswer,
    getSelectedAnswer,
    qstOptions,
    noMoreQsts,
    toast,
  ]);

  // const goToPrevQst = useCallback(() => {
  //   if (currentQstIndex === 0) return;
  //   setCurrentQstIndex((prevQst) => prevQst - 1);
  // }, [currentQstIndex]);

  if (noMoreQsts) {
    return <p>Finished</p>;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12  md:w-[80vw] max-w-4xl w-[90vw] ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-2">
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <Link
              href=""
              className="px-2 py-1 text-white rounded-lg bg-slate-800"
            >
              {game.topic}
            </Link>
          </p>
          <div className="flex items-center gap-x-1 text-slate-400">
            <Timer />
            <p>
              {hours && `${hours}h `} {minutes && `${minutes}m `}{" "}
              {`${seconds}s`}
            </p>
          </div>
        </div>
        <MCQCounter
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
        />
      </div>

      {/* Question */}
      <Card className="mt-5">
        <CardHeader className="flex flex-row gap-x-4 items-center">
          <div>
            <span className="font-medium"> {currentQstIndex + 1}</span>
            <Separator />
            <span className="text-slate-400">{game.questions.length}</span>
          </div>
          <CardDescription className="text-lg">
            {currentQst.question}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Options */}
      <div className="mt-5 flex flex-col gap-3">
        {qstOptions.map((qst, index) => (
          <Button
            key={index}
            className="h-fit justify-start w-full"
            variant={getSelectedAnswer() === index ? "default" : "outline"}
            onClick={() => selectAnswer(index)}
          >
            <div className="flex items-center gap-x-2.5 px-3 py-2 ">
              <span className="px-2 py-1 border border-slate-400 rounded-sm">
                {index + 1}
              </span>
              <p className="text-left">{qst}</p>
            </div>
          </Button>
        ))}
      </div>

      <div className="flex justify-center my-5 gap-x-4">
        {/* <Button disabled={currentQstIndex === 0} onClick={goToPrevQst}>
          Previous
        </Button> */}
        <Button disabled={isChecking} onClick={goToNextQst}>
          Next <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
