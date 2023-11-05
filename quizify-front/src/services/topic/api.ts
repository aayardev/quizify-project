import httpClient from "@/lib/http-client";
import { type AxiosRequestConfig } from "axios";

export const getTopics = (
  page: number = 1,
  size: number = 5,
  config?: AxiosRequestConfig
) => {
  return httpClient.get<API.TResponse<API.TTopic>>(
    `topics/?page=${page}&size=20`,
    config
  );
};

export const getTopicDetail = (topicId: string) => {
  return httpClient.get<API.TTopic>(`topics/${topicId}/`);
};

export const getTopicLatestQuizzes = (
  topicId: string,
  page: number = 1,
  size: number = 5,
  params: string = "",
  config?: AxiosRequestConfig
) => {
  console.log(params, "params");
  return httpClient.get<API.TGetLatestQuizzesReturnedData>(
    `topics/${topicId}/latest-quizzes/?page=${page}&size=${size}${`&${params}`}&fields=id,created_by,topic,participants_count,likes_count,is_liked,like_id`,
    config
  );
};

export const getTopicTopQuizzes = (
  topicId: string,
  page: number = 1,
  size: number = 5,
  params: string = "",
  config?: AxiosRequestConfig
) => {
  return httpClient.get<API.TGetTopQuizzesReturnedData>(
    `topics/${topicId}/top-quizzes/?page=${page}&size=${size}${`&${params}`}&fields=id,created_by,topic,participants_count,likes_count,is_liked,like_id`,
    config
  );
};

export const subscribeToTopic = (topicId: string) => {
  return httpClient.post(`topics/${topicId}/subscribe/`);
};

export const unsubscribeToTopic = (topicId: string) => {
  return httpClient.post(`topics/${topicId}/unsubscribe/`);
};
