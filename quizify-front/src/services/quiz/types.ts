declare namespace API {
  type TResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  };

  type TQuiz = {
    id: number;
    topic: API.TTopic;
    created_by: API.TUser;
    participants_count: number;
    likes_count: number;
  };

  type TGetLatestQuizzesReturnedData = TResponse<TQuiz>;
  type TGetTopQuizzesReturnedData = TResponse<TQuiz>;

  type TCreateQuizData = Record<"topic", string>;
}
