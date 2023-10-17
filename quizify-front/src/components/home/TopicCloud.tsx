"use client";
import { getTopics } from "@/services";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import WithUnderline from "../wrappers/WithUnderline";
import { Card } from "../ui/card";

import WordCloud from "../WordCloud";

type Props = {
  topics: API.TTopic[];
};

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
              words={topics.map((topic) => ({
                text: topic.name,
                value: topic.quizzes_count,
                id: topic.id,
                color: topic.color,
              }))}
              width={500}
              height={500}
              onWordClick={(event, d) => {
                router.push(
                  // @ts-ignore
                  `/topic/${d.text}-${d.id}/?color=${encodeURIComponent(
                    // @ts-ignore
                    d.color
                  )}`
                );
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default TopicCloud;
