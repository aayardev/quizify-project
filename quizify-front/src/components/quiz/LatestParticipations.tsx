"use client";
import React from "react";
import Carousel from "../Carousel";
import ParticipantCard from "./ParticipantCard";
import { useQuery } from "react-query";
import { getQuizLatestParticipations } from "@/services";

type Props = {
  participations: API.TParticipation[];
  quizId: number;
};

const LatestParticipations = ({
  participations: initialParticipations,
  quizId,
}: Props) => {
  const { data: participations } = useQuery({
    queryKey: ["top-quizzes"],
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

      <Carousel className="mt-4">
        {participations?.map((participation) => (
          <ParticipantCard
            participant={participation.user}
            timesince={participation.timesince}
            key={participation.id}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default LatestParticipations;
