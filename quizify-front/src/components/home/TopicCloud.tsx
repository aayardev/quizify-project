"use client";
import React from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { Card } from "../ui/card";
import { useQuery } from "react-query";
import WithUnderline from "../WithUnderline";
import { useRouter } from "next/navigation";
import { getTopics } from "@/services";

type Props = {
  topics: API.TTopic[];
};

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

const TopicCloud = ({ topics: initialTopics }: Props) => {
  const router = useRouter();
  const { data: topics, isSuccess } = useQuery({
    queryKey: ["top-topics"],
    queryFn: async () => {
      const res = await getTopics(undefined, 8);
      return res.data.results;
    },
    initialData: initialTopics,
  });
  return (
    <div>
      <WithUnderline className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tighter  relative inline-block ">
          Topic Cloud
        </h2>
      </WithUnderline>
      <p className="text-muted-foreground text-sm">
        Click on a topic to start a quiz on it.
      </p>
      {isSuccess && (
        <Card className="mt-8">
          <div className="max-w-sm mx-auto">
            <WordCloud
              data={topics.map((topic) => ({
                text: topic.name,
                value: topic.quizzes_count,
                id: topic.id,
              }))}
              width={500}
              height={500}
              font="Times"
              fontStyle="italic"
              fontWeight="bold"
              fontSize={(word) => Math.log2(word.value) * 5 + 24}
              spiral="rectangular"
              rotate={(word) => word.value % 360}
              padding={5}
              random={Math.random}
              fill={(_d: any, i: string) => schemeCategory10ScaleOrdinal(i)}
              onWordClick={(event, d) => {
                // @ts-ignorelogin
                router.push(`/topic/${d.text}-${d.id}`);
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default TopicCloud;
