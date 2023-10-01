"use client";
import { verifyEmail } from "@/services/auth/api";
import { useEffect } from "react";

type Props = {
  params: {
    key: string;
  };
};

const Page = ({ params }: Props) => {
  const { key } = params;
  const verify = async () => {
    try {
      if (!key) return;
      const res = await verifyEmail({ key });
    } catch (err: any) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    // verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <button onClick={verify}>verify </button>;
};

export default Page;
