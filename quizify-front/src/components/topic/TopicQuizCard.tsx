"use client";

import UserAvatar from "@/components/UserAvatar";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import WithTooltip from "@/components/wrappers/withTooltip";
import { dislikeQuiz, likeQuiz } from "@/services";
import { Info, ThumbsUp, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useHover } from "usehooks-ts";

type Props = {
  quiz: API.TQuiz;
};

const TopicQuizCard = ({ quiz }: Props) => {
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
      queryClient.invalidateQueries({ queryKey: ["topic-top-quizzes"] });
      queryClient.invalidateQueries({
        queryKey: ["topic-latest-quizzes"],
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
      queryClient.invalidateQueries({ queryKey: ["topic-top-quizzes"] });
      queryClient.invalidateQueries({
        queryKey: ["topic-latest-quizzes"],
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
              cursor: "pointer",
              color: isHover ? quiz.topic.color : undefined,

              textDecorationStyle: "solid",
              textDecorationLine: isHover ? "underline" : undefined,

              textDecorationThickness: "3px",
              textDecorationColor: quiz.topic.color,
            }}
            ref={titleRef}
            href={`/quiz/${quiz.topic.name}-${quiz.id}`}
          >
            #{quiz.id}
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
          >
            <div className="flex items-center gap-x-0.5 ">
              <ThumbsUp className="h-4 w-4 " />
              <span>{quiz.likes_count}</span>
            </div>
          </WithTooltip> */}

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
              />
              <span>{likesCount}</span>
            </div>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TopicQuizCard;
