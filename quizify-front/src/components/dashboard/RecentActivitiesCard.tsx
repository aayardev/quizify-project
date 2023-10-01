import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const RecentActivitiesCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Recent Activities</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          You have played a total of 0 quizzes.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default RecentActivitiesCard;
