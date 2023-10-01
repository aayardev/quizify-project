"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import UserAvatar from "./UserAvatar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  user: Pick<
    User,
    "first_name" | "last_name" | "full_name" | "profile_image" | "email"
  >;
};
const UserAccountNav = ({ user }: Props) => {
  const { full_name, email } = user;
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white  " align="end">
        <div className="py-1 px-2">
          {full_name && (
            <h5 className="font-medium dark:text-black">{user.full_name}</h5>
          )}
          {email && (
            <p className="text-sm w-48 dark:text-black">{user.email}</p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="dark:text-black dark:hover:text-white"
          onSelect={(e) => {
            // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjj");
            // router.push("/u/update");
            e.preventDefault();
          }}
        >
          <Link href="/u/update">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onSelect={() => signOut().catch(console.error)}
        >
          Sign out
          <LogOut className="w-4 h-4 ml-2 " />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
