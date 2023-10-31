import TopicDetailHeader from "@/components/topic/TopicDetailHeader";
import TopicLatestQuizzes from "@/components/topic/TopicLatestQuizzes";
import TopicTopQuizzes from "@/components/topic/TopicTopQuizzes";
import {
  getTopicDetail,
  getTopicLatestQuizzes,
  getTopicTopQuizzes,
} from "@/services";

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

  const { data: topic } = await getTopicDetail(id);

  return (
    <div>
      <TopicDetailHeader isSubscribed={topic.is_subscribed} />
      <TopicLatestQuizzes quizzes={latestQuizzes} topicId={topic.id} />
      <TopicTopQuizzes quizzes={topQuizzes} topicId={topic.id} />
    </div>
  );
};

export default TopicDetail;
