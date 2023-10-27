import React from "react";
import { Card, CardHeader } from "../ui/card";
import { Avatar } from "../ui/avatar";
import UserAvatar from "../UserAvatar";
import { Clock2, Star } from "lucide-react";

type Props = {
  participant: API.TUser;
  timesince?: string;
  showBadge?: boolean;
  position?: number;
};

const ParticipantCard = ({
  participant,
  timesince,
  showBadge,
  position,
}: Props) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mx-auto flex items-center flex-col py-5">
          <UserAvatar size="lg" user={participant} />
          <div className="flex items-center justify-center gap-x-1.5 mt-1.5 ">
            <span className="text-sm  font-medium ">
              {participant.full_name ? participant.full_name : "Quizify User"}
            </span>
            {showBadge && position && [1, 2, 3].includes(position) ? (
              // <div
              //   className=" rounded-sm    bg-red-500 text-white text-sm font-bold "
              //   style={{
              //     backgroundColor:
              //       position === 1
              //         ? "#eec400"
              //         : position === 2
              //         ? "#cfcfcf"
              //         : "#704a07",
              //     fontSize:
              //       position === 1 ? "14px" : position === 2 ? "12px" : "10px",
              //     paddingTop:
              //       position === 1 ? "2px" : position === 2 ? "1px" : "0.5px",
              //     paddingBottom:
              //       position === 1 ? "2px" : position === 2 ? "1px" : "0.5px",
              //     paddingLeft:
              //       position === 1 ? "12px" : position === 2 ? "8px" : "6px",
              //     paddingRight:
              //       position === 1 ? "12px" : position === 2 ? "8px" : "6px",
              //   }}
              // >
              //   {position}
              // </div>
              <Star
                style={{
                  height:
                    position === 1 ? "20px" : position === 2 ? "16px" : "12px",
                  width:
                    position === 1 ? "20px" : position === 2 ? "16px" : "12px",
                }}
                fill={
                  position === 1
                    ? "#eec400"
                    : position === 2
                    ? "#cfcfcf"
                    : "#704a07"
                }
                stroke={
                  position === 1
                    ? "#eec400"
                    : position === 2
                    ? "#cfcfcf"
                    : "#704a07"
                }
              />
            ) : null}
          </div>

          {timesince && (
            <span className="text-xs text-muted-foreground">{timesince}</span>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default ParticipantCard;
