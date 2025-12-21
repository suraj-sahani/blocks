import { Location } from "@/lib/types";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Cable, Heart, MapPinCheckInside, Pin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { getAmenityIcon } from "@/lib/utils";

type SpotCardProps = {
  detail: Location;
  className?: string;
};

const SpotCard = ({ detail, className }: SpotCardProps) => {
  const renderPrice = () => {
    switch (detail?.type) {
      case "parking":
        return (
          <p>
            <span className="text-4xl font-bold">${detail?.price} /</span>{" "}
            <span className="text-md font-bold">hr</span>
          </p>
        );
      case "ev":
        return (
          <p>
            <span className="text-4xl font-bold">${detail?.price} /</span>{" "}
            <span className="text-md font-bold">kWh</span>
          </p>
        );
    }
  };
  return (
    <Card
      className={`p-0 rounded-2xl min-h-[480px] shadow-xs w-full overflow-hidden ${className}`}
    >
      <CardContent
        className="relative m-1.5 p-2 flex items-end flex-1 bg-gray-100 rounded-2xl bg-cover"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0)),
    url(${detail?.image})`,
        }}
      >
        <div className="absolute top-1.5 left-1 bg-[rgba(0,0,0,0.75)] h-9 px-2 rounded-full flex items-center">
          <Star className="text-white h-4 w-4" />
          <p className="text-white text-sm font-bold ml-1">
            <span>{detail?.rating}</span>
            <span> / </span>
            <span>5</span>
          </p>
        </div>

        <Button
          size="icon"
          className="absolute top-1.5 right-1 bg-[rgba(0,0,0,0.75)] rounded-full h-9"
        >
          <Heart className="h-4 w-4" />
        </Button>

        <div className="text-white w-full">
          <h2 className="text-lg font-bold">{detail.name}</h2>
          {/* <p className="text-xs">{detail?.description}</p> */}

          <div className="flex items-center mt-4">
            <MapPinCheckInside className="h-4 w-4" />
            <p className="text-xs font-semibold ml-1">{detail.address}</p>
          </div>

          <div className="flex items-center flex-wrap gap-1 my-4">
            {detail?.amenities.map((amenity, index) => {
              const Icon = getAmenityIcon(amenity.name)?.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full py-1 px-2 bg-[rgba(0,0,0,0.5)]"
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <p className="text-xs">{amenity.name}</p>
                </div>
              );
            })}
          </div>

          {detail?.type === "ev" && (
            <div className="flex items-center flex-wrap gap-1 my-4">
              <span className="font-bold text-sm">Connectors:</span>

              {detail?.connectorTypes.map((connector, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full py-1 px-2 bg-[rgba(0,0,0,0.5)]"
                >
                  <Cable className="h-4 w-4" />
                  <p className="text-xs">{connector}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between w-full">
            {renderPrice()}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-white hover:border-primary text-white"
            >
              Book
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpotCard;
