"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { verifyEmail as verifyEmailAPI } from "@/services";
import { AxiosError } from "axios";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { BarLoader, BeatLoader } from "react-spinners";

type Props = {
  params: {
    key: string;
  };
};

const Page = ({ params }: Props) => {
  const { key } = params;
  const { toast } = useToast();

  const {
    mutate: verifyEmail,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async () => {
      await verifyEmailAPI({
        key: decodeURIComponent(key),
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <div className="absolute inset-0 h-screen w-screen flex items-center justify-center">
        <BarLoader color="black" />
      </div>
    );

  if (isSuccess)
    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Email verification successful.
          </CardTitle>
          <CardDescription className="!mt-5">
            Your email has been verified successfully.{" "}
            <Link href="/login" className="underline underline-offset-2">
              Click here
            </Link>{" "}
            to login to your account.
          </CardDescription>
        </CardHeader>
      </Card>
    );

  if (isError)
    return (
      <div className="absolute inset-0 h-screen w-screen flex items-center justify-center">
        <Link href="/" className="font-medium">
          <MoveLeft className="inline-block" /> Go Home
        </Link>
      </div>
    );

  return null;
};

export default Page;
