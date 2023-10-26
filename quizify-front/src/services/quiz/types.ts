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
    is_liked: boolean;
    like_id: number | null;
    is_played: boolean;
    score: number;

    questions: TQuestion[];
  };

  type TGetLatestQuizzesReturnedData = TResponse<TQuiz>;
  type TGetTopQuizzesReturnedData = TResponse<TQuiz>;

  type TCreateQuizData = Record<"topic", string>;

  type TParticipation = { id: number; user: API.TUser; timesince: string };
  type TParticipations = TResponse<TParticipation>;

  type TOption = { id: number; body: string };
  type TQuestion = { id: number; body: string; options: TOption[] };

  type TCheckAnswerData = Record<"question" | "option", number> &
    Record<"is_first", boolean>;

  type TCheckAnswerReturnedData = Record<"is_correct", boolean>;
}
