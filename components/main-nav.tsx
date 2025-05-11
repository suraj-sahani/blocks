"use client";
import { getExistingSession } from "@/lib/session";
import { MapPin } from "lucide-react";
import React from "react";
import UserButton from "./user-button";
import { Button } from "./ui/button";
import Link from "next/link";
import { SessionPayload } from "@/lib/types";
import { SearchBar } from "./searchbar";

type Props = {
  user: SessionPayload | undefined;
};

const MainNav = ({ user }: Props) => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="p-2 container flex justify-between items-center">
        <Link href="/" className="no-underline text-current">
          <h5 className="font-bold text-xl">
            Bl<span className="text-blue-500 font-extrabold">o</span>cks
          </h5>
        </Link>

        <SearchBar className="hidden md:flex" />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {user ? (
              <>
                <div className="rounded-full p-3 bg-[rgba(0,0,0,0.5)] flex items-center backdrop-blur-md">
                  <MapPin className="text-white h-4 w-4" />
                  <span className="text-white text-xs font-bold ml-1">
                    Kyoto, Japan
                  </span>
                </div>
                <UserButton user={user} />
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="rounded-full h-full"
                >
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button asChild className="rounded-full h-full">
                  <Link href="/sign-up">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNav;
