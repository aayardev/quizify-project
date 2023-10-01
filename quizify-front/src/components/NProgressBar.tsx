"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {};

const NProgressBar = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };
  }, [router]);
  return null;
};

export default NProgressBar;
