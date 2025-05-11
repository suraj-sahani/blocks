import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ParkingMeter, PlugZap } from "lucide-react";
import PopularParkingSpots from "./popular-parking-spots";
import PopularChargingSpots from "./popular-charging-spots";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="h-full relative flex flex-col items-center justify-center py-16">
      {/* <Image
        src={"/hero-2.jpg"}
        alt="parking-lot"
        fill
        className="brightness-90"
      /> */}

      <h1 className="text-2xl md:text-7xl font-bold max-w-5xl text-center">
        Find Your Ideal{" "}
        <span className="text-2xl md:text-7xl font-bold">Parking Spot</span>
      </h1>
      {/* TODO Implement a text rolling transition here */}

      {/* <div className="flex items-center">
        <h1 className="text-7xl font-bold max-w-5xl">Find Your Ideal</h1>
        <div className={classes.serviceDiv}>
          <h1 className="text-7xl font-bold max-w-5xl">Parking Spot</h1>
          <h1 className="text-7xl font-bold max-w-5xl">EV Charging Station</h1>
          <h1 className="text-7xl font-bold max-w-5xl"></h1>
        </div>
      </div> */}

      <h1 className="text-2xl md:text-7xl font-bold text-center">
        In Few Minutes
      </h1>
      <p className="font-medium text-lg text-center mt-4 max-w-lg">
        At Bl<span className="text-blue-500 font-extrabold">o</span>cks, we have
        simplified the process of finding safe, secure, and affordable parking
        spots / charging stations in a flash.
      </p>
      <Button asChild className="rounded-full mt-6 px-12 h-10">
        <Link href="/sign-up">Get Started</Link>
      </Button>

      {/* <div>
        <Tabs defaultValue="parking-spots" className=" items-center mt-8">
          <TabsList className="w-[400px] h-11 mb-8">
            <TabsTrigger value="parking-spots" className="h-full">
              <ParkingMeter />
              Parking Spots
            </TabsTrigger>
            <TabsTrigger value="charging-spots" className="h-full">
              <PlugZap />
              EV Chargers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="parking-spots">
            <PopularParkingSpots />
          </TabsContent>
          <TabsContent value="charging-spots">
            <PopularChargingSpots />
          </TabsContent>
        </Tabs>
      </div> */}
    </section>
  );
};

export default Hero;
