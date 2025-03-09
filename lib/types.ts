import { SpotType } from "./enum";

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
