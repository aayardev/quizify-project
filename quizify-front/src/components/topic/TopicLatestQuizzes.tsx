"use client";
import { getLatestQuizzes } from "@/services/quiz/api";
import React from "react";
import { useQuery } from "react-query";
import Carousel from "../Carousel";
import QuizCard from "../QuizCard";
import { useTheme } from "next-themes";
import WithUnderline from "../wrappers/WithUnderline";
import { getTopicLatestQuizzes } from "@/services";
import TopicQuizCard from "./TopicQuizCard";

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
      <h2 className="text-lg sm:text-xl font-bold tracking-tighter   relative inline-block ">
        Latest Quizzes
      </h2>

      <Carousel className="mt-4">
        {quizzes?.map((quiz) => (
          <TopicQuizCard quiz={quiz} key={quiz.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default TopicLatestQuizzes;
