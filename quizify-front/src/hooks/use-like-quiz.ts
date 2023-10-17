import { likeQuiz, dislikeQuiz } from "@/services";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useLikeQuiz = (quiz: API.TQuiz) => {
  const queryClient = useQueryClient();

  const [likesCount, setLikesCount] = useState(quiz.likes_count);
  const [isLiked, setIsLiked] = useState(quiz.is_liked);
  const [likeId, setLikeId] = useState(quiz.like_id);

  useEffect(() => {
    setLikesCount(quiz.likes_count);
  }, [quiz.likes_count]);

  useEffect(() => {
    setIsLiked(quiz.is_liked);
  }, [quiz.is_liked]);

  useEffect(() => {
    setLikeId(quiz.like_id);
  }, [quiz.like_id]);

  const { mutate: like, isLoading: isLiking } = useMutation<{ id: number }>({
    mutationFn: async () => {
      const res = await likeQuiz(quiz.id);
      return res.data;
    },
    onSuccess: ({ id }) => {
      setLikeId(id);
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      queryClient.invalidateQueries({ queryKey: ["top-quizzes"] });
      queryClient.invalidateQueries({
        queryKey: ["latest-quizzes"],
      });
    },
  });

  const { mutate: dislike, isLoading: isDisliking } = useMutation({
    mutationFn: () => {
      return dislikeQuiz(quiz.id, likeId!);
    },
    onSuccess: () => {
      setLikeId(null);
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
      queryClient.invalidateQueries({ queryKey: ["top-quizzes"] });
      queryClient.invalidateQueries({
        queryKey: ["latest-quizzes"],
      });
    },
  });

  return {
    likesCount,
    isLiked,
    likeId,
    isLiking,
    isDisliking,
    like,
    dislike,
  };
};

export default useLikeQuiz;
