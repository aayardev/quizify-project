import { getServerToken } from "@/lib/next-auth";

import Navbar from "@/components/Navbar";
import LatestQuizzes from "@/components/home/LatestQuizzes";
import {
  getLatestQuizzes,
  getTopQuizzes,
  getTopics,
} from "@/services/quizz/api";
import TopQuizzes from "@/components/home/TopQuizzes";
import TopicCloud from "@/components/home/TopicCloud";

export default async function Home() {
  const {
    data: { results: latestQuizzes },
  } = await getLatestQuizzes(undefined, 8);

  const {
    data: { results: topQuizzes },
  } = await getTopQuizzes(undefined, 8);

  const {
    data: { results: topics },
  } = await getTopics(undefined, 8);

  // if (!session?.user)
  //   return (
  //     <div className="absolute w-full h-full bg-white inset-0 z-20 bg-cover">
  //       <div className="w-full h-full backdrop-blur-md bg-gray-200/50" />
  //       <QuizifyLogo className="absolute top-5 left-8" />
  //       <LoginCard />
  //     </div>
  //   );

  return (
    <>
      <Navbar />
      <main className="p-8 mx-auto  max-w-7xl pt-24 ">
        <TopicCloud topics={topics} />
        <LatestQuizzes quizzes={latestQuizzes} />
        <TopQuizzes quizzes={topQuizzes} />
      </main>
    </>
  );
}
