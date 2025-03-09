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
    <div className="container mx-0 ml-auto">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {parkingSpots.map((spot, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/4"
            >
              <SpotCard detail={spot} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PopularParkingSpots;
