"use client";
import { useTheme } from "next-themes";
import React from "react";
import { BeatLoader } from "react-spinners";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";

const Spinner = (props: LoaderSizeMarginProps) => {
  const { theme } = useTheme();

  return <BeatLoader color={theme === "dark" ? "black" : "white"} {...props} />;
};

export default Spinner;
