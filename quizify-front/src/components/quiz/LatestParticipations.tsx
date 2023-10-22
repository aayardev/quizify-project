"use client";
import React from "react";
import Carousel from "../Carousel";
import ParticipantCard from "./ParticipantCard";
import { useQuery } from "react-query";
import { getQuizLatestParticipations } from "@/services";
import EmptyData from "../EmptyData";

type Props = {
  participations: API.TParticipation[];
  quizId: number;
};

const LatestParticipations = ({
  participations: initialParticipations,
  quizId,
}: Props) => {
  const {
    data: participations,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["quiz-latest-partcs", quizId],
    queryFn: async () => {
      const res = getQuizLatestParticipations(quizId, undefined, 8);
      return (await res).data.results;
    },
    initialData: initialParticipations,
  });

  return (
    <div className="mt-10">
      <h2 className="text-lg sm:text-xl font-bold tracking-tighter   relative inline-block ">
        Latest Participants
      </h2>

      <Carousel
        className="mt-4"
        showSeeAllBtn={(participations?.length ?? 0) > 8}
      >
        {participations?.map((participation) => (
          <ParticipantCard
            participant={participation.user}
            timesince={participation.timesince}
            key={participation.id}
          />
        ))}
      </Carousel>

      {isSuccess && participations.length === 0 ? <EmptyData /> : null}
    </div>
  );
};

export default LatestParticipations;
