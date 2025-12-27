"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/client";
import clientLogger from "@/lib/pino/client";
import { cn } from "@/lib/utils";
import { ChevronsDown } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type Props = {
  className?: string;
};
const UserProfile = ({ className }: Props) => {
  const session = authClient.useSession();

  if (session.isPending || session.isRefetching)
    return <Skeleton className="w-30 h-10 rounded-lg " />;

  if (!session.data)
    return (
      <div className="hidden lg:flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button variant="hero" asChild>
          <Link href="/sign-up">Get Started</Link>
        </Button>
      </div>
    );

  clientLogger.info(session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("cursor-pointer", className)}>
        <div className="flex items-center gap-2 p-2  pr-4 bg-primary/50 rounded-full text-white text-sm font-semibold">
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{session.data.user.name}</span>
          <ChevronsDown className="size-4 animate-bounce" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => authClient.signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
