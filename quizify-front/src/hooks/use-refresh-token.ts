"use client";

import httpClient from "@/lib/http-client";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await httpClient.post("/auth/refresh", {
      refresh: session?.refresh,
    });

    if (session) session.access = res.data.access;
    else signIn();
  };
  return refreshToken;
};
