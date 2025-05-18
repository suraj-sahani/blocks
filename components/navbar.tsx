import React from "react";
import { getExistingSession } from "@/lib/session";
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
