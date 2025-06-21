import { JWTPayload } from "jose";
import { SpotType } from "./enum";
import { z } from "zod/v4";
import { ParkingLocationSchema } from "./form.schema";

export interface ParkingLocation
  extends z.infer<typeof ParkingLocationSchema> {}

export interface ParkingSpot {
  title: string;
  description: string;
  rating: number;
  amenities: Array<{
    name: string;
    icon: any;
  }>;
  image: string;
  hourlyPrice: number;
  imageUrl: string;
  type: string;
  address: string;
}

export interface ChargingSpot {
  title: string;
  description: string;
  rating: number;
  status: string;
  connectorTypes: string[];
  powerOutput: number;
  amenities: Array<{
    name: string;
    icon: any;
  }>;
  pricePerKwh: number;
  imageUrl: string;
  occupancy: number;
  totalSpots: number;
  type: string;
  address: string;
}

export interface SessionPayload extends JWTPayload {
  id: string;
  first_name: string;
  last_name: string | null;
  imageUrl: string | null;
}
