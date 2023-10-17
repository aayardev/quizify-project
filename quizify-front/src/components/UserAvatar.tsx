"use client";

import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage, AvatarProps } from "./ui/avatar";

type Props = {
  user: Pick<User, "first_name" | "last_name" | "profile_image">;
  size?: AvatarProps["size"];
};

const UserAvatar = ({ user, size = "default" }: Props) => {
  return (
    <Avatar size={size}>
      {user.profile_image ? (
        <AvatarImage sizes="" src={user.profile_image} alt="Profile picture" />
      ) : (
        <AvatarFallback>
          {user.first_name && user.last_name ? (
            <>
              {user.first_name[0].toUpperCase() +
                user.last_name[0].toUpperCase()}
            </>
          ) : (
            "QU"
          )}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
