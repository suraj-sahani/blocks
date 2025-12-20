"use client";
import { Card } from "@/components/ui/card";
import { Location } from "@/lib/types";
import { Car, MapPin, Navigation, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type Props = {
  locations: Location[];
  showMap: boolean;
};

export default function LocationList({ locations, showMap }: Props) {
  return (
    <div
      className={`${showMap ? "w-1/2" : "w-full"} overflow-y-auto p-4 lg:p-6`}
    >
      <p className="text-sm text-muted-foreground mb-4">
        {locations.length} spots found near your location
      </p>

      <div className="space-y-4">
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/location/${location.id}`}>
              <Card variant="interactive" className="overflow-hidden">
                <div className="flex">
                  <div className="w-48 h-36 relative shrink-0">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                        location.type === "ev"
                          ? "bg-green-500 text-white"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {location.type === "ev" ? (
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" /> EV
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Car className="w-3 h-3" /> Parking
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {location.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {location.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ${location.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /{location.priceUnit}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        {location.rating} ({location.reviews})
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Navigation className="w-3 h-3" />
                        {location.distance}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {location.available} available
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {location.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
