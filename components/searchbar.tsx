"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full max-w-sm items-center ${className}`}
    >
      <input
        type="text"
        className="px-4 py-3 bg-gray-100 rounded-full w-full focus:outline-none"
        placeholder={placeholder}
      />
      {/* <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-10 bg-gray-100 px-4 py-4 h-11 rounded-full"
      /> */}
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-1 h-full px-3 py-2 text-muted-foreground hover:bg-transparent rounded-full cursor-pointer"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
