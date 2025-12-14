"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Battery,
  Calendar,
  Car,
  Clock,
  Filter,
  MapPin,
  Navigation,
  ParkingCircle,
  Search as SearchIcon,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mockLocations = [
  {
    id: 1,
    name: "Downtown Parking Garage",
    address: "123 Main Street, Downtown",
    type: "parking",
    price: 5,
    priceUnit: "hour",
    rating: 4.8,
    reviews: 234,
    distance: "0.3 mi",
    available: 12,
    features: ["Covered", "24/7", "Security"],
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&h=300&fit=crop",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    name: "EV Supercharger Hub",
    address: "456 Electric Ave, Tech District",
    type: "ev",
    price: 0.35,
    priceUnit: "kWh",
    rating: 4.9,
    reviews: 189,
    distance: "0.5 mi",
    available: 4,
    features: ["Level 3", "150kW", "Covered"],
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop",
    coordinates: { lat: 40.7148, lng: -74.009 },
  },
  {
    id: 3,
    name: "Central Plaza Parking",
    address: "789 Plaza Way, Central Business",
    type: "parking",
    price: 4,
    priceUnit: "hour",
    rating: 4.6,
    reviews: 156,
    distance: "0.7 mi",
    available: 28,
    features: ["Open Air", "EV Charging", "Valet"],
    image:
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400&h=300&fit=crop",
    coordinates: { lat: 40.7118, lng: -74.004 },
  },
  {
    id: 4,
    name: "Green Energy Station",
    address: "321 Eco Boulevard, Green District",
    type: "ev",
    price: 0.28,
    priceUnit: "kWh",
    rating: 4.7,
    reviews: 92,
    distance: "1.2 mi",
    available: 6,
    features: ["Level 2", "Solar Powered", "24/7"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    coordinates: { lat: 40.7158, lng: -74.012 },
  },
  {
    id: 5,
    name: "Airport Long-Term Parking",
    address: "555 Airport Road, Terminal Area",
    type: "parking",
    price: 15,
    priceUnit: "day",
    rating: 4.5,
    reviews: 312,
    distance: "3.5 mi",
    available: 150,
    features: ["Shuttle", "Covered", "Long-term"],
    image:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&h=300&fit=crop",
    coordinates: { lat: 40.7208, lng: -74.018 },
  },
  {
    id: 6,
    name: "Mall EV Charging Center",
    address: "888 Shopping Center Dr",
    type: "ev",
    price: 0.32,
    priceUnit: "kWh",
    rating: 4.4,
    reviews: 78,
    distance: "2.1 mi",
    available: 8,
    features: ["Level 2", "Free Parking", "Mall Access"],
    image:
      "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?w=400&h=300&fit=crop",
    coordinates: { lat: 40.7088, lng: -74.001 },
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [vehicleType, setVehicleType] = useState("sedan");
  const [spotType, setSpotType] = useState<"all" | "parking" | "ev">("all");
  const [showMap, setShowMap] = useState(true);

  const filteredLocations = mockLocations.filter((loc) => {
    if (spotType === "all") return true;
    return loc.type === spotType;
  });

  return (
    <>
      <div className="pt-20 min-h-screen">
        {/* Search Bar */}
        <div className="bg-card border-b border-border sticky top-16 lg:top-20 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-end gap-4">
              {/* Location Search */}
              <div className="flex-1 min-w-[200px]">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter address, city, or zip code"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="w-40">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Check-in
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="datetime-local"
                    className="pl-10 text-sm"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="w-40">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Check-out
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="datetime-local"
                    className="pl-10 text-sm"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="w-36">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Vehicle
                </Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="ev">Electric Vehicle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button variant="hero" size="lg">
                <SearchIcon className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                <button
                  onClick={() => setSpotType("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    spotType === "all"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSpotType("parking")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    spotType === "parking"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <ParkingCircle className="w-4 h-4" />
                  Parking
                </button>
                <button
                  onClick={() => setSpotType("ev")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    spotType === "ev"
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Battery className="w-4 h-4" />
                  EV Charging
                </button>
              </div>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMap(!showMap)}
                className="ml-auto"
              >
                {showMap ? "Hide Map" : "Show Map"}
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex h-[calc(100vh-220px)]">
          {/* List View */}
          <div
            className={`${
              showMap ? "w-1/2" : "w-full"
            } overflow-y-auto p-4 lg:p-6`}
          >
            <p className="text-sm text-muted-foreground mb-4">
              {filteredLocations.length} spots found near your location
            </p>

            <div className="space-y-4">
              {filteredLocations.map((location, index) => (
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

          {/* Map View */}
          {showMap && (
            <div className="w-1/2 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Map integration ready. Connect with Mapbox or Google Maps to
                    display locations.
                  </p>
                </div>
              </div>
              {/* Map Pins Preview */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredLocations.slice(0, 4).map((loc, i) => (
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
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
