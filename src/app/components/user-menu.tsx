"use client";

import { getUser } from "@/lib/data/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AuthDialog from "./auth-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { deleteSession } from "@/lib/session";
import { DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function UserMenu({
  user,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
}) {
  if (!user) return <AuthDialog />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarFallback>
              {user.name
                ? user.name?.split(" ").length > 1
                  ? user.name.split(" ")[0][0] + user.name.split(" ")[1][0]
                  : user.name[0] + user.name?.[1]
                : null}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.role === "admin" ? (
          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>
              <DashboardIcon className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteSession()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
