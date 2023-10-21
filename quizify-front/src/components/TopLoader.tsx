"use client";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import React from "react";

type Props = {};

const TopLoader = (props: Props) => {
  const { theme } = useTheme();
  console.log("theme", theme);

  return <NextTopLoader color={theme === "dark" ? "white" : "black"} />;
};

export default TopLoader;
