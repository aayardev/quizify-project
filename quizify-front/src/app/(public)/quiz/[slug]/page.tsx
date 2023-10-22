import LatestParticipations from "@/components/quiz/LatestParticipations";
import QuizDetailHeader from "@/components/quiz/QuizDetailHeader";
import QuizMobileCTL from "@/components/quiz/QuizMobileCTL";
import QuizSidebar from "@/components/quiz/QuizSidebar";
import TopParticipations from "@/components/quiz/TopParticipations";
import { Separator } from "@/components/ui/separator";
import {
  getQuizLatestParticipations,
  getQuizTopParticipations,
  retrieveQuiz,
} from "@/services";

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

  const {
    data: { results: latestParticipations },
  } = await getQuizLatestParticipations(quiz.id, undefined, 8);

  const {
    data: { results: topParticipations },
  } = await getQuizTopParticipations(quiz.id, undefined, 8);

  return (
    <div className="mb-4 flex items-start justify-between gap-x-10 relative pb-32">
      <div className="flex-1">
        <QuizDetailHeader quiz={quiz} />
        {/* <Separator className="my-4" /> */}
        <LatestParticipations
          participations={latestParticipations}
          quizId={quiz.id}
        />
        {/* <Separator className="my-4" /> */}
        <TopParticipations
          participations={topParticipations}
          quizId={quiz.id}
        />
      </div>
      <QuizSidebar quiz={quiz} />
      <QuizMobileCTL />
    </div>
  );
};

export default QuizDetail;
