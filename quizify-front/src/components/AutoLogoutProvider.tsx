"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function AutoLogoutProvider({ children }: React.PropsWithChildren<{}>) {
  const { data: session, status } = useSession();

  useEffect(() => {
    // session is still loading
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      // maybe you want to do something more here..
      signOut();
    }
  }, [status]);

  return <>{children}</>;
}
