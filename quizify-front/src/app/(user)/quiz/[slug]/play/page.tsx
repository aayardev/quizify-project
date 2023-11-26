import QuizQuestions from "@/components/quiz/QuizQuestions";
import { retrieveQuiz } from "@/services";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    color: string;
  };
};

const PlayQuizPage = async ({ params }: Props) => {
  const { slug } = params;
  const [_topic, id] = slug.split("-");
  const { data: quiz } = await retrieveQuiz(Number(id));
  const { questions } = quiz;

  return (
    <div className="mb-4 flex items-start justify-between gap-x-10 relative pb-32">
      <QuizQuestions questions={questions} topic={quiz.topic} />
    </div>
  );
};

export default PlayQuizPage;
