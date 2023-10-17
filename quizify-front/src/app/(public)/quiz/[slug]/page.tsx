import UserAvatar from "@/components/UserAvatar";
import QuizDetailHeader from "@/components/quiz/QuizDetailHeader";
import { retrieveQuiz } from "@/services";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    color: string;
  };
};

const QuizDetail = async ({ params, searchParams }: Props) => {
  const { slug } = params;
  const [_topic, id] = slug.split("-");
  const { data: quiz } = await retrieveQuiz(Number(id));

  return (
    <div>
      <QuizDetailHeader quiz={quiz} />
    </div>
  );
};

export default QuizDetail;
