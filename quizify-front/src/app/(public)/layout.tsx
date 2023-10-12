import Navbar from "@/components/Navbar";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="p-8 mx-auto  max-w-7xl pt-24 ">{children}</main>
    </>
  );
};

export default Layout;
