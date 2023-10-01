import Navbar from "@/components/Navbar";
import { AutoLogoutProvider } from "@/components/auto-logout-provider";
import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <AutoLogoutProvider>
      <Navbar />
      <main className="p-8 mx-auto  max-w-7xl pt-24 ">{children}</main>
    </AutoLogoutProvider>
  );
};

export default Layout;
