import React from "react";
import { Card, CardHeader } from "../ui/card";
import { Avatar } from "../ui/avatar";
import UserAvatar from "../UserAvatar";
import { Clock2 } from "lucide-react";

type Props = {
  participant: API.TUser;
  timesince: string;
};

const ParticipantCard = ({ participant, timesince }: Props) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mx-auto flex items-center flex-col py-5">
          <UserAvatar size="lg" user={participant} />
          <span className="text-sm mt-1.5 font-medium ">
            {participant.full_name ? participant.full_name : "Quizify User"}
          </span>
          <span className="text-xs text-muted-foreground">{timesince}</span>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ParticipantCard;
