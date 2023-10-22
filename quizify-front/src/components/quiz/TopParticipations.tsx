"use client";

import { getQuizTopParticipations } from "@/services";
import React from "react";
import { useQuery } from "react-query";
import EmptyData from "../EmptyData";
import ParticipantCard from "./ParticipantCard";
import Carousel from "../Carousel";

type Props = {
  participations: API.TParticipation[];
  quizId: number;
};

const TopParticipations = ({
  participations: initialParticipations,
  quizId,
}: Props) => {
  const {
    data: participations,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["quiz-top-partcs", quizId],
    queryFn: async () => {
      const res = getQuizTopParticipations(quizId, undefined, 8);
      return (await res).data.results;
    },
    initialData: initialParticipations,
  });
  return (
    <div className="mt-8">
      <h2 className="text-lg sm:text-xl font-bold tracking-tighter   relative inline-block ">
        Top Participants
      </h2>

      <Carousel
        className="mt-4"
        showSeeAllBtn={(participations?.length ?? 0) > 8}
      >
        {participations
          ? participations.map((participation) => (
              <ParticipantCard
                participant={participation.user}
                timesince={participation.timesince}
                key={participation.id}
              />
            ))
          : null}
      </Carousel>

      {isSuccess && participations.length === 0 ? <EmptyData /> : null}
    </div>
  );
};

export default TopParticipations;
