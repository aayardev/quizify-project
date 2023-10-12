"use client";
import { getLatestQuizzes } from "@/services/quiz/api";
import React from "react";
import { useQuery } from "react-query";
import Carousel from "../carousel";
import QuizCard from "../quiz-card";
import { useTheme } from "next-themes";
import WithUnderline from "../WithUnderline";
import { getTopicLatestQuizzes } from "@/services";

type Props = {
  quizzes: API.TQuiz[];
  topicId: string;
};

const TopicLatestQuizzes = ({ quizzes: initialQuizzes, topicId }: Props) => {
  const { data: quizzes } = useQuery({
    queryKey: ["topic-latest-quizzes", topicId],
    queryFn: async () => {
      const res = getTopicLatestQuizzes(topicId, undefined, 8);
      return (await res).data.results;
    },
    initialData: initialQuizzes,
  });
  return (
    <div className="mt-10">
      <WithUnderline className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter  relative inline-block ">
          Latest Quizzes
        </h2>
      </WithUnderline>

      <Carousel className="mt-8">
        {quizzes?.map((quiz) => (
          <QuizCard quiz={quiz} key={quiz.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default TopicLatestQuizzes;
