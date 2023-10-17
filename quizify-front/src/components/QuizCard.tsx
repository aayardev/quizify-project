"use client";

import { capitalize } from "@/lib/utils";
import { Info, ThumbsUp, User } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import WithTooltip from "@/components/wrappers/withTooltip";
import { useHover } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { dislikeQuiz, likeQuiz } from "@/services";

type Props = {
  quiz: API.TQuiz;
};

const QuizCard = ({ quiz }: Props) => {
  const titleRef = useRef(null);
  const isHover = useHover(titleRef);

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

  return (
    <Card
    // style={{
    //   backgroundColor: quiz.topic.color,
    // }}
    >
      <CardHeader>
        <CardTitle>
          <Link
            style={{
              color: quiz.topic.color,
              cursor: "pointer",
              textDecorationStyle: "solid",
              textDecorationLine: isHover ? "underline" : undefined,
              textDecorationThickness: "3px",
            }}
            ref={titleRef}
            href={`/quiz/${quiz.topic.name}-${quiz.id}`}
          >
            {capitalize(quiz.topic.name)} #{quiz.id}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-x-1.5">
          <UserAvatar size="sm" user={quiz.created_by} />{" "}
          <span className="text-sm">{quiz.created_by.full_name}</span>
        </div>

        <div className="flex items-center gap-x-2.5">
          <WithTooltip
            content={
              <div className="flex items-center gap-x-1.5">
                <Info className="h-3.5 w-3.5   " />
                <span>Participants count</span>
              </div>
            }
          >
            <div className="flex items-center gap-x-0.5 ">
              <User className="h-4 w-4 " />
              <span>{quiz.participants_count}</span>
            </div>
          </WithTooltip>
          {/* <WithTooltip
            content={
              <div className="flex items-center gap-x-1.5">
                <Info className="h-3.5 w-3.5 " />
                <span>Likes count</span>
              </div>
            }
          ></WithTooltip> */}

          <button
            onClick={() => {
              if (!isLiked) return like();
              if (likeId) dislike();
            }}
            disabled={isLiking || isDisliking}
          >
            <div className="flex items-center gap-x-0.5 ">
              <ThumbsUp
                className="h-4 w-4"
                fill={isLiked ? "currentColor" : "none"}
                // stroke={isLiked ? "currentColor" : "currentColor"}
              />
              <span>{likesCount}</span>
            </div>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
