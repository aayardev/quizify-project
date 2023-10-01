"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const data = [
  { text: "Hey", value: 1000 },
  { text: "lol", value: 200 },
  { text: "first impression", value: 800 },
  { text: "very cool", value: 1000000 },
  { text: "duck", value: 10 },
];

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

type Word = {
  topic: string;
  count: number;
};

type Props = {
  words: Word[];
};

const WordsCloudCard = ({ words }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Hot Topics</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <WordCloud
          data={words.map((word) => ({ text: word.topic, value: word.count }))}
          width={500}
          height={500}
          font="Times"
          fontStyle="italic"
          fontWeight="bold"
          fontSize={(word) => Math.log2(word.value) * 5}
          spiral="rectangular"
          rotate={(word) => word.value % 360}
          padding={5}
          random={Math.random}
          fill={(_d: any, i: string) => schemeCategory10ScaleOrdinal(i)}
          onWordClick={(event, d) => {
            console.log(`onWordClick: ${d.text}`);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default WordsCloudCard;
