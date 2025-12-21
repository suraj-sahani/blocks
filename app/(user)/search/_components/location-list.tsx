"use client";
import SpotCard from "@/components/spot-card";
import { Card } from "@/components/ui/card";
import { Location } from "@/lib/types";
import { cn } from "@/lib/utils";
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
      className={cn(`overflow-y-auto p-4 lg:p-6`, {
        "md:1/2 lg:w-1/4": showMap,
      })}
    >
      <p className="text-sm text-muted-foreground mb-4">
        {locations.length} spots found near your location
      </p>

      <div
        className={cn("space-y-4", {
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4":
            !showMap,
        })}
      >
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/location/${location.id}`}>
              <SpotCard detail={location} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
