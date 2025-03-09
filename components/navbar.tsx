import React from "react";
import { Button } from "./ui/button";
import { SearchBar } from "./searchbar";
import { MapPin } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-2 left-0 z-50 w-full">
      <nav className="p-2 container flex justify-between items-center">
        <h5 className="font-bold text-xl">
          Bl<span className="text-blue-500 font-extrabold">o</span>cks
        </h5>
        <SearchBar className="hidden md:flex" />

        <div className="flex items-center gap-2">
          <div className="rounded-full p-3 bg-[rgba(0,0,0,0.5)] flex items-center backdrop-blur-md">
            <MapPin className="text-white h-4 w-4" />
            <span className="text-white text-xs font-bold ml-1">
              Kyoto, Japan
            </span>
          </div>
          <Button className="rounded-full h-full">Register</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
