import httpClient from "@/lib/http-client";
import { type AxiosRequestConfig } from "axios";

export const getLatestQuizzes = (
  page: number = 1,
  size: number = 5,
  params: string = "",
  config?: AxiosRequestConfig
) => {
  console.log(params, "params");
  return httpClient.get<API.TGetLatestQuizzesReturnedData>(
    `latest-quizzes/?page=${page}&size=${size}&${params}&fields=id,created_by,topic,participants_count,likes_count`,
    config
  );
};

export const getTopQuizzes = (
  page: number = 1,
  size: number = 5,
  params: string = "",
  config?: AxiosRequestConfig
) => {
  return httpClient.get<API.TGetTopQuizzesReturnedData>(
    `top-quizzes/?page=${page}&size=${size}&${params}&fields=id,created_by,topic,participants_count,likes_count`,
    config
  );
};

export const getTopics = (
  page: number = 1,
  size: number = 5,
  config?: AxiosRequestConfig
) => {
  return httpClient.get<API.TResponse<API.TTopic>>(
    `topics/?page=${page}&size=${size}`,
    config
  );
};
