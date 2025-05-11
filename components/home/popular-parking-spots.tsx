import React from "react";
import { Heart, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { parkingSpots } from "@/lib/constants";
import SpotCard from "../spot-card";

const PopularParkingSpots = () => {
  return (
    <div className="container w-full mx-auto px-4 py-10">
      <Carousel
        opts={{
          align: "start",
          // loop: true,
        }}
        className="w-full max-w-8xl"
      >
        <CarouselContent className="-ml-4">
          {parkingSpots.map((spot, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <SpotCard detail={spot} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <div className="flex justify-end gap-2 mt-4"> */}
        <CarouselPrevious />
        <CarouselNext />
        {/* </div> */}
      </Carousel>
      {/* <Carousel
        className="w-full"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4">
          {parkingSpots.map((spot, index) => (
            <div key={index}>
              <CarouselItem
                key={index}
                className="pl-4 sm:basis-full md:basis-1/2 lg:basis-1/3"
              >
                <SpotCard detail={spot} />
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
};

export default PopularParkingSpots;
