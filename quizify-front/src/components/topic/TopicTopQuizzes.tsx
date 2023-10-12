"use client";

import React from "react";
import Carousel from "../carousel";
import QuizCard from "../quiz-card";
import { useQuery } from "react-query";
import { getTopQuizzes } from "@/services/quiz/api";
import WithUnderline from "../WithUnderline";
import { getTopicTopQuizzes } from "@/services";

type Props = {
  quizzes: API.TQuiz[];
  topicId: string;
};

const TopicTopQuizzes = ({ quizzes: initialQuizzes, topicId }: Props) => {
  const { data: quizzes } = useQuery({
    queryKey: ["topic-top-quizzes", topicId],
    queryFn: async () => {
      const res = getTopicTopQuizzes(topicId, undefined, 8);
      return (await res).data.results;
    },
    initialData: initialQuizzes,
  });
  return (
    <div className="mt-10">
      <WithUnderline className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter  relative inline-block ">
          Top Quizzes
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

export default TopicTopQuizzes;
