import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserAvatar from "./UserAvatar";

type Props = {
  notif: API.TNotification;
};

const Notification = ({ notif }: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage
          src={notif.notification_image || undefined}
          alt="@shadcn"
        />
        <AvatarFallback>QU</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-md">{notif.notification_title}</p>
        <span className="text-xs text-muted-foreground">{notif.since}</span>
      </div>
    </div>
  );
};

export default Notification;
