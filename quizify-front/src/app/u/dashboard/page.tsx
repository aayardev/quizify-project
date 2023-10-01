"use client";
import LinkCard from "@/components/LinkCard";
import RecentActivitiesCard from "@/components/dashboard/RecentActivitiesCard";
import WordsCloudCard from "@/components/dashboard/WordsCloudCard";
import { Button } from "@/components/ui/button";
import { getCurrentUserDetail } from "@/services/auth/api";
import { BrainCircuit, History } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tighter mb-4 ">Dashboard</h2>
      <div className="grid grid-cols-12 gap-3   ">
        <div className="col-span-full md:col-span-6">
          <LinkCard
            title="Quiz me!"
            description="Challenge yourself to a quiz with a topic of your choice."
            route="/quiz"
            icon={<BrainCircuit size={28} strokeWidth={2.5} />}
          />
        </div>
        <div className="col-span-full md:col-span-6">
          <LinkCard
            title="History"
            description="View past quiz attempts."
            route="/history"
            icon={<History size={28} strokeWidth={2.5} />}
          />
        </div>
        <div className="col-span-full lg:col-span-7 ">
          <WordsCloudCard
            words={[
              {
                topic: "Python",
                count: 100,
              },
            ]}
          />
        </div>
        <div className="col-span-full lg:col-span-5">
          <RecentActivitiesCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
