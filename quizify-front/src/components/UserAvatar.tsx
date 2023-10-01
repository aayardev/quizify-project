"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { User } from "next-auth";
import { useTimeout } from "usehooks-ts";

type Props = {
  user: Pick<User, "first_name" | "last_name" | "profile_image">;
};

const UserAvatar = ({ user }: Props) => {
  console.log(user.profile_image, "user.profile_image");
  return (
    <Avatar>
      {user.profile_image ? (
        <AvatarImage src={user.profile_image} alt="Profile picture" />
      ) : (
        <AvatarFallback>
          {user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
