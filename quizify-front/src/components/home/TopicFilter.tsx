"use client";
import { cva } from "class-variance-authority";
import React from "react";
import { useQuery } from "react-query";

type Props = {
  filter: string;
  onFilter: (topic: string) => void;
};

const buttonVariants = cva(" shadow py-1.5 px-4 text-sm rounded-full", {
  variants: {
    variant: {
      default: "bg-primary-foreground text-primary",
      active: "bg-primary text-white dark:text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const TopicFilter = ({ onFilter, filter }: Props) => {
  const { data: topics } = useQuery<API.TTopic[]>({
    queryKey: ["top-topics"],
  });

  console.log(topics, "topics");
  return (
    <ul className="flex gap-x-2 mt-2">
      <ul>
        <button
          className={buttonVariants({
            variant: filter === "all" ? "active" : "default",
          })}
          onClick={() => onFilter("all")}
        >
          all
        </button>
      </ul>
      {topics?.map((topic) => (
        <li key={topic.id}>
          <button
            onClick={() => onFilter(topic.name)}
            className={buttonVariants({
              variant: filter === topic.name ? "active" : "default",
            })}
          >
            {topic.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TopicFilter;
