"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Battery,
  Calendar,
  Clock,
  Filter,
  MapPin,
  ParkingCircle,
  SearchIcon,
} from "lucide-react";
import {
  parseAsBoolean,
  parseAsIsoDate,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";
import { spotTypes, vehicleTypes } from "./booking-search-params";

type Props = {
  showMap: boolean;
  spotType: "all" | "parking" | "ev";
};

const BookingSearchBar = ({ showMap, spotType }: Props) => {
  const [address, setAddress] = useQueryState(
    "address",
    parseAsString.withDefault("").withOptions({
      shallow: false,
      limitUrlUpdates: {
        method: "debounce",
        timeMs: 500,
      },
    })
  );
  const [checkIn, setCheckIn] = useQueryState(
    "checkIn",
    parseAsIsoDate.withDefault(new Date())
  );
  const [checkOut, setCheckOut] = useQueryState(
    "checkOut",
    parseAsIsoDate.withDefault(new Date())
  );
  const [vehicleType, setVehicleType] = useQueryState(
    "vehicleType",
    parseAsStringLiteral(vehicleTypes).withDefault("sedan")
  );
  const [clientSpotTYpe, setClientSpotType] = useQueryState(
    "type",
    parseAsStringLiteral(spotTypes).withDefault(spotType).withOptions({
      shallow: false,
    })
  );
  const [showMapClient, setShowMapClient] = useQueryState(
    "showMap",
    parseAsBoolean.withDefault(showMap).withOptions({
      shallow: false,
    })
  );

  // console.log("Client Params:", { showMap, clientSpotTYpe, address });

  return (
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                value={checkIn ? checkIn.toISOString().slice(0, 16) : ""}
                onChange={(e) => setCheckIn(e.target.valueAsDate)}
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
                value={checkOut ? checkOut.toISOString().slice(0, 16) : ""}
                onChange={(e) => setCheckOut(e.target.valueAsDate)}
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="w-36">
            <Label className="text-xs text-muted-foreground mb-1 block">
              Vehicle
            </Label>
            <Select
              value={vehicleType}
              onValueChange={(val: typeof vehicleType) => setVehicleType(val)}
            >
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
              onClick={() => setClientSpotType("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                clientSpotTYpe === "all"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setClientSpotType("parking")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                clientSpotTYpe === "parking"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <ParkingCircle className="w-4 h-4" />
              Parking
            </button>
            <button
              onClick={() => setClientSpotType("ev")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                clientSpotTYpe === "ev"
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
            onClick={() => setShowMapClient(!showMap)}
            className="ml-auto"
          >
            {showMap ? "Hide Map" : "Show Map"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSearchBar;
