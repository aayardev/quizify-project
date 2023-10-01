import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

type Props = {
  theme: "light" | "dark" | "system";
};

const ModeToggleCheck = ({ theme }: Props) => {
  const { theme: current } = useTheme();
  return (
    <Check
      className={`h-4 w-4 mr-2 inline-block ${
        current !== theme && "opacity-0"
      }`}
    />
  );
};

export default ModeToggleCheck;
