"use client";
import { motion } from "motion/react";
import { Location } from "@/lib/types";
import { Car, MapPin, Zap } from "lucide-react";
import { Activity } from "react";

type Props = {
  showMap: boolean;
  locations: Location[];
};
export default function LocationMap({ locations, showMap }: Props) {
  return (
    <Activity mode={showMap ? "visible" : "hidden"}>
      <div className="w-1/2 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Map integration ready. Connect with Mapbox or Google Maps to
              display locations.
            </p>
          </div>
        </div>
        {/* Map Pins Preview */}
        <div className="absolute inset-0 pointer-events-none">
          {locations.slice(0, 4).map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`absolute ${
                i === 0
                  ? "top-1/4 left-1/4"
                  : i === 1
                  ? "top-1/3 right-1/3"
                  : i === 2
                  ? "bottom-1/3 left-1/3"
                  : "bottom-1/4 right-1/4"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  loc.type === "ev" ? "bg-green-500" : "bg-primary"
                }`}
              >
                {loc.type === "ev" ? (
                  <Zap className="w-5 h-5 text-white" />
                ) : (
                  <Car className="w-5 h-5 text-white" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Activity>
  );
}
