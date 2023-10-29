import TopicDetailHeader from "@/components/topic/TopicDetailHeader";
import TopicLatestQuizzes from "@/components/topic/TopicLatestQuizzes";
import TopicTopQuizzes from "@/components/topic/TopicTopQuizzes";
import { getTopicLatestQuizzes, getTopicTopQuizzes } from "@/services";

type Props = {
  params: {
    slug: string;
  };
};

const TopicDetail = async ({ params }: Props) => {
  const { slug } = params;
  const [_topic, id] = slug.split("-");

  const {
    data: { results: latestQuizzes },
  } = await getTopicLatestQuizzes(id, undefined, 8);

  const {
    data: { results: topQuizzes },
  } = await getTopicTopQuizzes(id, undefined, 8);

  return (
    <div>
      <TopicDetailHeader />
      <TopicLatestQuizzes quizzes={latestQuizzes} topicId={id} />
      <TopicTopQuizzes quizzes={topQuizzes} topicId={id} />
    </div>
  );
};

export default TopicDetail;
