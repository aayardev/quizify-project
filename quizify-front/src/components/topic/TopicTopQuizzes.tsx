"use client";

import { getTopicTopQuizzes } from "@/services";
import { useQuery } from "react-query";
import Carousel from "../Carousel";
import EmptyData from "../EmptyData";
import TopicQuizCard from "./TopicQuizCard";

type Props = {
  quizzes: API.TQuiz[];
  topicId: number;
};

const TopicTopQuizzes = ({ quizzes: initialQuizzes, topicId }: Props) => {
  const { data: quizzes, isSuccess } = useQuery({
    queryKey: ["topic-top-quizzes", topicId],
    queryFn: async () => {
      const res = getTopicTopQuizzes(`${topicId}`, undefined, 8);
      return (await res).data.results;
    },
    initialData: initialQuizzes,
  });
  return (
    <div className="mt-10">
      <h2 className="text-lg sm:text-xl font-bold tracking-tighter  relative inline-block ">
        Top Quizzes
      </h2>

      <Carousel className="mt-4" showSeeAllBtn={(quizzes?.length ?? 0) > 8}>
        {quizzes?.map((quiz) => (
          <TopicQuizCard quiz={quiz} key={quiz.id} />
        ))}
      </Carousel>

      {isSuccess && quizzes.length === 0 ? <EmptyData /> : null}
    </div>
  );
};

export default TopicTopQuizzes;
