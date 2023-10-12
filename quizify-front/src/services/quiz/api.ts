import httpClient from "@/lib/http-client";
import { type AxiosRequestConfig } from "axios";

export const createQuiz = (
  data: API.TCreateQuizData,
  config?: AxiosRequestConfig
) => {
  return httpClient.post<API.TQuiz>(`create-quiz/`, data, config);
};

export const getLatestQuizzes = (
  page: number = 1,
  size: number = 5,
  params: string = "",
  config?: AxiosRequestConfig
) => {
  console.log(params, "params");
  return httpClient.get<API.TGetLatestQuizzesReturnedData>(
    `latest-quizzes/?page=${page}&size=${size}${`&${params}`}&fields=id,created_by,topic,participants_count,likes_count`,
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
    `top-quizzes/?page=${page}&size=${size}${`&${params}`}&fields=id,created_by,topic,participants_count,likes_count`,
    config
  );
};
