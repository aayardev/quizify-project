"use client";
import httpClient from "@/lib/http-client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./use-refresh-token";

const useHttpClient = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = httpClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.access}`;
          return httpClient(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httpClient.interceptors.request.eject(requestIntercept);
      httpClient.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return httpClient;
};

export default useHttpClient;
