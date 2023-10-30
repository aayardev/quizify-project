"use client";
import { getAllNotifications, markNotifcationAsRead } from "@/services";
import { AxiosError } from "axios";
import { BellRing } from "lucide-react";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import Notification from "./Notification";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";

const getAllNotificationsFn = async ({
  pageParam = 1,
}): Promise<API.TNotifications> => {
  const res = getAllNotifications(pageParam, 5);
  return (await res).data;
};
const Notifications = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme } = useTheme();

  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
    isLoading,
  } = useInfiniteQuery<API.TNotifications, AxiosError>(
    ["notifications"],
    getAllNotificationsFn,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          console.log(pages.length + 1, "getNextPageParam");
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );

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
          {isSuccess && notifications?.pages[0]?.unread_notifications > 0 ? (
            <div className="absolute h-[6px] w-[6px] bg-primary rounded-full top-1 right-2" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0 ">
        <ScrollArea className="h-72 py-3 px-1   rounded-md border">
          {notifications?.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.results.map((notif) => (
                  <DropdownMenuItem
                    key={notif.id}
                    className="cursor-pointer"
                    onSelect={async () => {
                      if (notif.unread) markAsRead(notif.id);
                      else {
                        router.push(notif.notification_url);
                      }
                    }}
                  >
                    <Notification notif={notif} />
                  </DropdownMenuItem>
                ))}
              </Fragment>
            );
          })}

          <div className="flex justify-center ">
            {isSuccess ? (
              <>
                {notifications?.pages[0]?.count === 0 ? (
                  <div className="w-48">
                    <p className="text-center text-sm text-muted-foreground">
                      No notifications yet.
                    </p>
                  </div>
                ) : null}
                {hasNextPage && !isFetchingNextPage ? (
                  <button
                    onClick={() => fetchNextPage()}
                    // Disable the Next Page button until we know a next page is available
                    // disabled={isPreviousData || !notifications?.next}
                    className="mx-auto text-xs text-muted-foreground underline"
                  >
                    show more
                  </button>
                ) : null}
              </>
            ) : null}

            {isLoading || isFetchingNextPage ? (
              <BeatLoader
                color={theme === "dark" ? "white" : "black"}
                size={6}
              />
            ) : null}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
