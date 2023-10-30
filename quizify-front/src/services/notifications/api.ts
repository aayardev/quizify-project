import httpClient from "@/lib/http-client";
import { type AxiosRequestConfig } from "axios";

export const getUnreadNotifications = (
  page: number = 1,
  size: number = 10,
  config?: AxiosRequestConfig
) => {
  return httpClient.get<API.TNotifications>(
    `unread-notifications/?page=${page}&size=${size}`,
    config
  );
};

export const getAllNotifications = (
  page: number = 1,
  size: number = 10,
  config?: AxiosRequestConfig
) => {
  return httpClient.get<API.TNotifications>(
    `all-notifications/?page=${page}&size=${size}`,
    config
  );
};

export const markNotifcationAsRead = (notifId: number) => {
  return httpClient.post<API.TNotification>(
    `notifications/${notifId}/mark-as-read/`
  );
};
