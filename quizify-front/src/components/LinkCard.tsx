"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { type ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  description: string;
  route: string;
};

const LinkCard = ({ title, icon, description, route }: Props) => {
  return (
    <Card className=" hover:cursor-pointer hover:opacity-75 relative">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {icon}
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <Link href={`${route}`} className="absolute inset-0 h-full w-full" />
    </Card>
  );
};

export default LinkCard;
