"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BellRing, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { getUnreadNotifications, markNotifcationAsRead } from "@/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Notification from "./Notification";
import { useRouter } from "next/navigation";

const Notifications = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    data: notifications,
    isSuccess,
    isPreviousData,
  } = useQuery({
    queryKey: ["notifications", page],
    queryFn: async () => {
      const res = getUnreadNotifications(page, 1);
      return (await res).data;
    },
    keepPreviousData: true,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (notifId: number) => {
      const res = await markNotifcationAsRead(notifId);
      return res.data;
    },

    onSuccess: (notif) => {
      router.push(notif.notification_url);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellRing className="h-4 w-4" />
          {isSuccess && notifications.results.length > 0 ? (
            <div className="absolute h-[6px] w-[6px] bg-black rounded-full top-1 right-2" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="py-3">
        {notifications?.results.map((notif) => (
          <DropdownMenuItem
            key={notif.id}
            className="cursor-pointer"
            onSelect={async () => {
              markAsRead(notif.id);
            }}
          >
            <Notification notif={notif} />
          </DropdownMenuItem>
        ))}

        {isSuccess ? (
          <div className="flex justify-center ">
            {notifications?.results.length === 0 ? (
              <div className="w-48">
                <p className="text-center text-sm text-muted-foreground">
                  No notifications yet.
                </p>
              </div>
            ) : null}
            {notifications?.next ? (
              <button
                onClick={() => {
                  if (!isPreviousData && notifications?.next) {
                    setPage((old) => old + 1);
                  }
                }}
                // Disable the Next Page button until we know a next page is available
                // disabled={isPreviousData || !notifications?.next}
                className="mx-auto text-xs text-muted-foreground underline"
              >
                show more
              </button>
            ) : null}
          </div>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
