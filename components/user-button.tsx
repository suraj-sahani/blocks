"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { SessionPayload } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUserInitials } from "@/lib/utils";
import { deleteSession } from "@/lib/session";
import { logoutUser } from "@/actions/user.actions";
type Props = {
  user: SessionPayload;
};
const UserButton = ({ user }: Props) => {
  const initials = getUserInitials(`${user.first_name} ${user.last_name}`);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage src={user.imageUrl ?? ""} alt={user.first_name} />
          <AvatarFallback className="text-sm font-bold bg-blue-100">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>Hi ! {user.first_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-bold">Profile</DropdownMenuItem>
        <DropdownMenuItem
          className="font-bold text-red-500"
          onClick={logoutUser}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
