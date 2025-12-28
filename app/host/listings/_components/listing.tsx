"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { listings } from "@/lib/constants";
import { Car, Edit, Eye, MapPin, Star, Trash2, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Listing() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="interactive" className="overflow-hidden">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-40 object-cover"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                    listing.type === "ev"
                      ? "bg-green-500 text-white"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {listing.type === "ev" ? (
                    <>
                      <Zap className="w-3 h-3 inline mr-1" />
                      EV
                    </>
                  ) : (
                    <>
                      <Car className="w-3 h-3 inline mr-1" />
                      Parking
                    </>
                  )}
                </span>
                <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {listing.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{listing.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" />
                  {listing.address}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-primary">
                    {listing.price}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    {listing.rating}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
