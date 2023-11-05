"use client";
import { useTheme } from "next-themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";

type Props = {};

const TopLoader = (props: Props) => {
  const { theme } = useTheme();
  console.log("theme", theme);

  return (
    <ProgressBar
      height="4px"
      color={theme === "dark" ? "white" : "black"}
      options={{ showSpinner: false }}
    />
  );
  // return <NextTopLoader color={theme === "dark" ? "white" : "black"} />;
};

export default TopLoader;
