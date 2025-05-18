"use client";
import React from "react";
import { DateTimePicker } from "./date-time-picker";
import { SearchBar } from "./searchbar";

const Sidebar = () => {
  return (
    <div className="min-h-20 w-md z-10 bg-white shadow-md rounded-2xl absolute left-5 top-5 p-2 space-y-4">
      <SearchBar className="w-full max-w-full" />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="start-time"
            className="text-sm font-semibold text-gray-700"
          >
            Start Time
          </label>
          <DateTimePicker />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="end-time"
            className="text-sm font-semibold text-gray-700"
          >
            End Time
          </label>
          <DateTimePicker />
        </div>
      </div>
      {/* <TimePicker value="09:30" onChange={(time) => console.log(time)} /> */}
    </div>
  );
};

export default Sidebar;
