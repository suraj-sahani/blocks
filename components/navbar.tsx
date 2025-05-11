import React from "react";
import { Button } from "./ui/button";
import { SearchBar } from "./searchbar";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { getExistingSession } from "@/lib/session";
import UserButton from "./user-button";
import MainNav from "./main-nav";

const Navbar = async () => {
  const user = await getExistingSession();

  return (
    <>
      <MainNav user={user} />
    </>
  );
};

export default Navbar;
