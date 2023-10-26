"use client";

import useCountupTimer from "@/hooks/use-countup-timer";
import useKeyPress from "@/hooks/use-key-press";
import { checkAnswer as checkAnswerAPI } from "@/services";
import { Separator } from "@radix-ui/react-separator";
import { AxiosError } from "axios";
import { ChevronRight, MoveLeft, MoveRight, Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useMutation } from "react-query";
import { useWindowSize } from "usehooks-ts";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { useToast } from "../ui/use-toast";

import ButtonLink from "@/components/ui/button-link";
import Link from "next/link";

import { CodeBlock, dracula } from "react-code-blocks";
import { capitalize, isProgrammingLanguage } from "@/lib/utils";

type Props = {
  questions: API.TQuestion[];
  topic: API.TTopic;
};

type TPressedKey = "down" | "up" | "left" | "right" | "1" | "2" | "3" | "4";

const QuizQuestions = ({ questions, topic }: Props) => {
  const { toast } = useToast();
  const { seconds, minutes, hours, startTimer, stopTimer, resetTimer } =
    useCountupTimer();

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  //   Questions
  const [currentQstIndex, setCurrentQstIndex] = useState(0);
  const [noMoreQsts, setNoMoreQsts] = useState(false);
  const [currentQst, setCurrentQst] = useState(questions[0]);
  const [qstOptions, setQstOptions] = useState(currentQst.options);
  const [selectedOption, setSelectedOption] = useState(
    questions[0].options[0].id
  );

  useEffect(() => {
    if (noMoreQsts) return;
    setCurrentQst(questions[currentQstIndex]);
    setQstOptions(questions[currentQstIndex].options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQstIndex]);

  useEffect(() => {
    setSelectedOption(currentQst.options[0].id);
  }, [currentQst]);

  const onKeyPress = useCallback((key: TPressedKey) => {
    if (key === "down") {
    } else if (key === "up") {
    } else {
    }
  }, []);

  useKeyPress("ArrowUp", () => onKeyPress("up"));
  useKeyPress("ArrowDown", () => onKeyPress("down"));
  useKeyPress("1", () => onKeyPress("1"));
  useKeyPress("2", () => onKeyPress("2"));
  useKeyPress("3", () => onKeyPress("3"));
  useKeyPress("4", () => onKeyPress("4"));

  // Check answers
  const { mutate: checkAnswer, isLoading: isChecking } = useMutation<
    API.TCheckAnswerReturnedData,
    AxiosError,
    API.TCheckAnswerData
  >({
    mutationFn: async (data) => {
      const response = await checkAnswerAPI(data);
      return response.data;
    },
  });

  const goToNexQst = useCallback(() => {
    checkAnswer(
      {
        question: currentQst.id,
        option: selectedOption,
        is_first: currentQstIndex === 0,
      },
      {
        onSuccess: ({ is_correct }) => {
          if (is_correct) {
            setCorrectAnswers((prev) => prev + 1);
            toast({
              title: "Correct",
              description: "You got it right!",
              variant: "success",
            });
          } else {
            toast({
              title: "Incorrect",
              description: "You got it wrong!",
              variant: "destructive",
            });
          }
          if (currentQstIndex === questions.length - 1) {
            stopTimer();
            setNoMoreQsts(true);
            return;
          }

          setTimeout(() => {
            setCurrentQstIndex((prevQst) => prevQst + 1);
          }, 500);
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        },
      }
    );
  }, [
    checkAnswer,
    currentQst.id,
    currentQstIndex,
    questions.length,
    selectedOption,
    stopTimer,
    toast,
  ]);

  const resetQuiz = useCallback(() => {
    setCurrentQstIndex(0);
    setNoMoreQsts(false);
    setCurrentQst(questions[0]);
    setSelectedOption(questions[0].options[0].id);
    setCorrectAnswers(0);
    resetTimer();
  }, [questions, resetTimer]);

  const { width, height } = useWindowSize();

  if (noMoreQsts) {
    return (
      <div className="h-screen w-screen fixed inset-0">
        <Confetti width={width} height={height} recycle numberOfPieces={100} />

        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 ">
              🎊 Quiz Completed 🎊
            </h1>

            <div className="flex items-center justify-center gap-x-1.5  my-10">
              <span className="text-xl font-medium ">You got </span>
              <span className="text-4xl font-bold">{correctAnswers} / 5</span>
              <span className="text-xl font-medium ">
                in {minutes && `${minutes}m `} {`${seconds}s`}{" "}
              </span>
            </div>

            <div className="border-t">
              <div className="flex justify-between mt-4 ">
                <ButtonLink href="/" variant={"link"}>
                  <MoveLeft className="inline-block w-4 h-4 mr-1.5" />
                  Go back home
                </ButtonLink>

                <Button onClick={() => resetQuiz()} variant="link">
                  Play again
                  <MoveRight className="inline-block w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-12  md:w-[80vw] max-w-4xl w-[90vw] mx-auto ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-2">
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <Link
              className="px-2 py-1 text-white rounded-lg bg-slate-800"
              href={`/topic/${topic.name}-${
                topic.id
              }/?color=${encodeURIComponent(topic.color)}`}
            >
              {capitalize(topic.name)}
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
      </div>

      {/* Question */}
      <Card className="mt-5">
        <CardHeader className="flex flex-row gap-x-4 items-center">
          <div>
            <span className="font-medium"> {currentQstIndex + 1}</span>
            <Separator />
            <span className="text-slate-400">{questions.length}</span>
          </div>

          {isProgrammingLanguage(topic.name) ? (
            <div className="flex-1 rounded-md overflow-hidden">
              <CodeBlock
                text={currentQst.body}
                language={topic.name}
                theme={dracula}
                wrapLongLines
              />
            </div>
          ) : (
            <CardDescription className="text-lg">
              {currentQst.body}
            </CardDescription>
          )}
        </CardHeader>
      </Card>

      {/* Options */}
      <div className="mt-5 flex flex-col gap-3">
        {qstOptions.map((opt, index) => (
          <Button
            key={opt.id}
            className="h-fit justify-start w-full"
            variant={selectedOption === opt.id ? "default" : "outline"}
            onClick={() => setSelectedOption(opt.id)}
          >
            <div className="flex items-center gap-x-2.5 px-3 py-2 ">
              <span className="px-2 py-1 border border-slate-400 rounded-sm">
                {index + 1}
              </span>
              <p className="text-left">{opt.body}</p>
            </div>
          </Button>
        ))}
      </div>

      <div className="flex justify-center my-5 gap-x-4">
        <Button
          isLoading={isChecking}
          disabled={isChecking}
          onClick={goToNexQst}
        >
          {currentQstIndex === questions.length - 1 ? (
            "Finish"
          ) : (
            <>
              Next <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestions;
