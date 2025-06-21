"use client";
import React from "react";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ManagementActions = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-2">
      <SearchBar className="max-w-sm" />
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-2xl h-11 w-11 md:w-auto bg-gray-100 hover:bg-gray-200 text-black"
              onClick={() => router.push("/host/add-location")}
            >
              <span className="hidden md:inline font-semibold">Add</span>
              <CirclePlus size={32} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="rounded-2xl h-11 w-11 md:w-auto bg-gray-100 hover:bg-gray-200 text-black">
              <span className="hidden md:inline font-semibold">Delete</span>
              <Trash2 size={32} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ManagementActions;
