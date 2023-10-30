import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserAvatar from "./UserAvatar";

type Props = {
  notif: API.TNotification;
};

const Notification = ({ notif }: Props) => {
  return (
    <div className="flex items-center gap-x-2 relative">
      <Avatar>
        <AvatarImage src={notif.notification_image || undefined} />
        <AvatarFallback>QU</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-md">{notif.notification_title}</p>
        <span className="text-xs text-muted-foreground">{notif.since}</span>
      </div>
      <div className="pr-2 flex items-start self-start	">
        {notif.unread ? (
          <div className="h-2 w-2 bg-primary rounded-full top-1 right-2 -m-1" />
        ) : null}
      </div>
    </div>
  );
};

export default Notification;
