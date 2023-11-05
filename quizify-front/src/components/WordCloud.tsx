"use client";
import WordCloudBase from "react-d3-cloud";

type TWord = {
  text: string;
  value: number;
  color: string;
};

type Props = {
  words: TWord[];
  width?: number;
  height?: number;
  onWordClick?: (event: any, d: Pick<TWord, "text" | "value">) => void;
};

const WordCloud = ({ words, ...rest }: Props) => {
  return (
    <WordCloudBase
      data={words}
      {...rest}
      font="Times"
      fontStyle="italic"
      fontWeight="bold"
      fontSize={(word) => Math.log2(word.value) * 5 + 26}
      spiral="rectangular"
      rotate={(word) => word.value % 360}
      padding={5}
      random={Math.random}
      fill={(d: any, i: string) => d.color}
    />
  );
};

export default WordCloud;
