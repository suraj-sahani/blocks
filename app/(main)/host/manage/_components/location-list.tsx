import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const LocationList = () => {
  return (
    <ScrollArea className="border-2 border-gray-200 flex-1 rounded-xl p-1 h-[calc(100dvh-200px)] mt-4">
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="h-24 bg-gray-100 rounded-lg mb-4" key={index}>
            {index}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LocationList;
