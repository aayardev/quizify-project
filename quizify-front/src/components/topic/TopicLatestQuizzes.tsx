"use client";
import { getTopicLatestQuizzes } from "@/services";
import { useQuery } from "react-query";
import Carousel from "../Carousel";
import EmptyData from "../EmptyData";
import TopicQuizCard from "./TopicQuizCard";

type Props = {
  quizzes: API.TQuiz[];
  topicId: number;
};

const TopicLatestQuizzes = ({ quizzes: initialQuizzes, topicId }: Props) => {
  const { data: quizzes, isSuccess } = useQuery({
    queryKey: ["topic-latest-quizzes", topicId],
    queryFn: async () => {
      const res = getTopicLatestQuizzes(`${topicId}`, undefined, 8);
      return (await res).data.results;
    },
    initialData: initialQuizzes,
  });
  return (
    <div className="mt-10">
      <h2 className="text-lg sm:text-xl font-bold tracking-tighter   relative inline-block ">
        Latest Quizzes
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

export default TopicLatestQuizzes;
