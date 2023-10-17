"use client";

import React from "react";
import Carousel from "../Carousel";
import QuizCard from "../QuizCard";
import { useQuery } from "react-query";
import { getTopQuizzes } from "@/services/quiz/api";
import WithUnderline from "../wrappers/WithUnderline";
import { getTopicTopQuizzes } from "@/services";
import TopicQuizCard from "./TopicQuizCard";

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
      <h2 className="text-lg sm:text-xl font-bold tracking-tighter  relative inline-block ">
        Top Quizzes
      </h2>

      <Carousel className="mt-4">
        {quizzes?.map((quiz) => (
          <TopicQuizCard quiz={quiz} key={quiz.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default TopicTopQuizzes;
