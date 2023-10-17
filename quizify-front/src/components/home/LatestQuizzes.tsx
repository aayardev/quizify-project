"use client";
import { getLatestQuizzes } from "@/services/quiz/api";
import React from "react";
import { useQuery } from "react-query";
import Carousel from "../carousel";
import QuizCard from "../QuizCard";
import TopicFilter from "./TopicFilter";
import { useTheme } from "next-themes";
import WithUnderline from "../wrappers/WithUnderline";

type Props = {
  quizzes: API.TQuiz[];
  showFilters?: boolean;
};

const LatestQuizzes = ({
  quizzes: initialQuizzes,
  showFilters = false,
}: Props) => {
  const { theme } = useTheme();

  const [filter, setFilter] = React.useState("all");
  const {
    data: quizzes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-quizzes", filter],
    queryFn: async () => {
      const res = getLatestQuizzes(
        undefined,
        8,
        `${filter === "all" ? "" : `topic__name=${filter}`} `
      );
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
      {showFilters && (
        <TopicFilter filter={filter} onFilter={(topic) => setFilter(topic)} />
      )}

      <Carousel className="mt-8">
        {quizzes?.map((quiz) => (
          <QuizCard quiz={quiz} key={quiz.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default LatestQuizzes;
