"use client";

import React, { useState } from "react";
import Carousel from "../Carousel";
import QuizCard from "../QuizCard";
import { useQuery } from "react-query";
import { getTopQuizzes } from "@/services/quiz/api";
import TopicFilter from "./TopicFilter";
import WithUnderline from "../wrappers/WithUnderline";
import EmptyData from "../EmptyData";

type Props = {
  quizzes: API.TQuiz[];
  showFilters?: boolean;
};

const TopQuizzes = ({
  quizzes: initialQuizzes,
  showFilters = false,
}: Props) => {
  const [filter, setFilter] = useState("all");
  const {
    data: quizzes,
    isSuccess,
  } = useQuery({
    queryKey: ["top-quizzes", filter],
    queryFn: async () => {
      const res = getTopQuizzes(
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
          Top Quizzes
        </h2>
      </WithUnderline>
      {showFilters && (
        <TopicFilter filter={filter} onFilter={(topic) => setFilter(topic)} />
      )}

      <Carousel className="mt-8" showSeeAllBtn={(quizzes?.length ?? 0) > 8}>
        {quizzes?.map((quiz) => (
          <QuizCard quiz={quiz} key={quiz.id} />
        ))}
      </Carousel>

      {isSuccess && quizzes.length === 0 ? <EmptyData /> : null}
    </div>
  );
};

export default TopQuizzes;
