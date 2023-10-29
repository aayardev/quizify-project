import { likeQuiz, dislikeQuiz } from "@/services";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { create } from "zustand";

type TLike = {
  id: number;
  count: number;
};

type TLikeStore = {
  likes: TLike[];
  pushLike: (like: TLike) => void;
  getLikeCount: (id: number) => number;
  increaseLikes: (id: number) => void;
  decreaseLikes: (id: number) => void;
};

export const useLikeStore = create<TLikeStore>((set, get) => ({
  likes: [],

  pushLike: (like: TLike) => {
    const likes = get().likes;
    const exist = likes.find((item) => item.id === like.id);
    if (!exist) set((state) => ({ likes: [...state.likes, like] }));
  },

  getLikeCount: (id: number) => {
    const likes = get().likes;
    return likes.find((item) => item.id === id)?.count || 0;
  },
  increaseLikes: (id) =>
    set((state) => ({
      likes: state.likes.map((like) =>
        like.id === id ? { ...like, count: like.count + 1 } : like
      ),
    })),

  decreaseLikes: (id) =>
    set((state) => ({
      likes: state.likes.map((like) =>
        like.id === id ? { ...like, count: like.count - 1 } : like
      ),
    })),
}));

const useLikeQuiz = (quiz: API.TQuiz) => {
  const queryClient = useQueryClient();

  const { likes, pushLike, increaseLikes, decreaseLikes } = useLikeStore();

  console.log(likes, "Likes");

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

  useEffect(() => {
    pushLike({
      id: quiz.id,
      count: quiz.likes_count,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: like, isLoading: isLiking } = useMutation<{ id: number }>({
    mutationFn: async () => {
      const res = await likeQuiz(quiz.id);
      return res.data;
    },
    onSuccess: ({ id }) => {
      setLikeId(id);
      setLikesCount((prev) => prev + 1);
      increaseLikes(quiz.id);
      setIsLiked(true);
      queryClient.invalidateQueries({ queryKey: ["top-quizzes"] });
      queryClient.invalidateQueries({
        queryKey: ["latest-quizzes"],
      });

      queryClient.invalidateQueries({ queryKey: ["topic-top-quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["topic-latest-quizzes"] });
    },
  });

  const { mutate: dislike, isLoading: isDisliking } = useMutation({
    mutationFn: () => {
      return dislikeQuiz(quiz.id, likeId!);
    },
    onSuccess: () => {
      setLikeId(null);
      setLikesCount((prev) => prev - 1);
      decreaseLikes(quiz.id);
      setIsLiked(false);
      queryClient.invalidateQueries({ queryKey: ["top-quizzes"] });
      queryClient.invalidateQueries({
        queryKey: ["latest-quizzes"],
      });

      queryClient.invalidateQueries({ queryKey: ["topic-top-quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["topic-latest-quizzes"] });
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
