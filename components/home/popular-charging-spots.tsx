import React from "react";

import { chargingStations } from "@/lib/constants";
import { Cable, Heart, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import SpotCard from "../spot-card";

const PopularChargingSpots = () => {
  return (
    <div className="container">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {chargingStations.map((station, index) => (
            <CarouselItem
              key={index}
              className="basis-full md:basis-1/2 lg:basis-1/4"
            >
              <SpotCard detail={station} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PopularChargingSpots;
