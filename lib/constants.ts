import {
  Accessibility,
  Battery,
  Bus,
  CalendarCheck,
  Car,
  Cctv,
  Coffee,
  ConciergeBell,
  CreditCard,
  FastForward,
  LampCeiling,
  Luggage,
  Mailbox,
  Plug,
  PlugZap,
  Shield,
  ShieldPlus,
  ShoppingBag,
  Toilet,
  Umbrella,
  Users,
  Waves,
  Wifi,
  Zap,
} from "lucide-react";
import { EVChargingLevels, EVConnectorTypes } from "./types";

export const IMAGEKIT_FOLDERS = {
  parking: "/blocks/parking_areas",
  ev: "/blocks/ev_stations",
  users: "/blocks/users",
  vehicles: "/blocks/user_vehicles",
} as const;

export const mockLocations = [
  {
    id: 1,
    name: "Downtown Parking Garage",
    address: "123 Main Street, Downtown",
    type: "parking",
    amenities: [
      {
        id: 1,
        name: "Open Air",
      },
      {
        id: 2,
        name: "EV Charging",
      },
      {
        id: 3,
        name: "Valet",
      },
    ],
    price: 5,
    priceUnit: "hour",
    rating: 4.8,
    reviews: 234,
    distance: "0.3 mi",
    available: 12,
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
    connectorTypes: ["Type 2", "Type 3"],
    rating: 4.9,
    reviews: 189,
    distance: "0.5 mi",
    available: 4,
    amenities: [
      {
        id: 1,
        name: "Open Air",
      },
      {
        id: 2,
        name: "EV Charging",
      },
      {
        id: 3,
        name: "Valet",
      },
    ],
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
    amenities: [
      {
        id: 1,
        name: "Open Air",
      },
      {
        id: 2,
        name: "EV Charging",
      },
      {
        id: 3,
        name: "Valet",
      },
    ],
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
    connectorTypes: ["Type 2", "Type 3"],
    price: 0.28,
    priceUnit: "kWh",
    rating: 4.7,
    reviews: 92,
    amenities: [
      {
        id: 1,
        name: "Open Air",
      },
      {
        id: 2,
        name: "EV Charging",
      },
      {
        id: 3,
        name: "Valet",
      },
    ],
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
    amenities: [
      {
        id: 1,
        name: "Shuttle",
      },
      {
        id: 2,
        name: "Covered",
      },
      {
        id: 3,
        name: "Long-term",
      },
    ],
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
    connectorTypes: ["Type 2", "Type 3"],
    price: 0.32,
    priceUnit: "kWh",
    rating: 4.4,
    reviews: 78,
    amenities: [
      {
        id: 1,
        name: "Open Air",
      },
      {
        id: 2,
        name: "EV Charging",
      },
      {
        id: 3,
        name: "Valet",
      },
    ],
    distance: "2.1 mi",
    available: 8,
    features: ["Level 2", "Free Parking", "Mall Access"],
    image:
      "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?w=400&h=300&fit=crop",
    coordinates: { lat: 40.7088, lng: -74.001 },
  },
] as const;

export const bookings = [
  {
    id: 1,
    user: "Sarah Mitchell",
    location: "Spot A1 - Downtown Garage",
    type: "parking",
    date: "Dec 15, 2024",
    time: "9:00 AM - 5:00 PM",
    amount: "$40",
    status: "Confirmed",
  },
  {
    id: 2,
    user: "Michael Chen",
    location: "EV Station 2",
    type: "ev",
    date: "Dec 15, 2024",
    time: "2:00 PM - 4:00 PM",
    amount: "$18",
    status: "Active",
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    location: "Spot B3 - Central Plaza",
    type: "parking",
    date: "Dec 14, 2024",
    time: "8:00 AM - 6:00 PM",
    amount: "$50",
    status: "Completed",
  },
  {
    id: 4,
    user: "David Kim",
    location: "EV Station 1",
    type: "ev",
    date: "Dec 14, 2024",
    time: "10:00 AM - 12:00 PM",
    amount: "$12",
    status: "Completed",
  },
];

export const listings = [
  {
    id: 1,
    name: "Downtown Parking Garage - Spot A1",
    type: "parking",
    address: "123 Main Street",
    price: "$5/hr",
    rating: 4.8,
    bookings: 156,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=200&h=150&fit=crop",
  },
  {
    id: 2,
    name: "EV Supercharger Station 1",
    type: "ev",
    address: "456 Electric Ave",
    price: "$0.35/kWh",
    rating: 4.9,
    bookings: 89,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=150&fit=crop",
  },
  {
    id: 3,
    name: "Central Plaza - Spot B3",
    type: "parking",
    address: "789 Plaza Way",
    price: "$4/hr",
    rating: 4.6,
    bookings: 203,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=200&h=150&fit=crop",
  },
];

export const iconMappings = {
  Restrooms: { icon: Toilet },
  "24/7 Access": { icon: CalendarCheck },
  "Security Cameras": { icon: Cctv },
  "On-Site Security": { icon: Shield },
  "Covered Parking": { icon: Umbrella },
  "Well-Lit Area": { icon: LampCeiling },
  "EV Fast Charging": { icon: Zap },
  "EV Standard Charging": { icon: FastForward },
  "Wheelchair Accessible": { icon: Accessibility },
  "Mobile Payment": { icon: CreditCard },
  "Payment Kiosk": { icon: CreditCard },
  "Waiting Area": { icon: Users },
  "Café or Vending": { icon: Coffee },
  "Wi-Fi": { icon: Wifi },
  "Car Wash Nearby": { icon: Waves },
};

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const CONNECTOR_TYPES = [
  {
    id: EVConnectorTypes.ComboCcs1,
    label: "CCS-1",
    description: "Combined Charging System 1",
  },
  {
    id: EVConnectorTypes.ComboCcs2,
    label: "CCS-2",
    description: "Combined Charging System 2",
  },
  {
    id: EVConnectorTypes.Chademo,
    label: "CHAdeMO",
    description: "DC Fast Charging",
  },
  {
    id: EVConnectorTypes.Tesla,
    label: "Tesla",
    description: "Tesla Supercharger",
  },
  { id: EVConnectorTypes.J1772, label: "J1772", description: "Level 1 & 2" },
  {
    id: EVConnectorTypes.Type2,
    label: "Type 2",
    description: "European Standard",
  },
  {
    id: EVConnectorTypes.Type1,
    label: "Type 1",
    description: "North American",
  },
  { id: EVConnectorTypes.Nacs, label: "NACS", description: "North American" },
  { id: EVConnectorTypes.Other, label: "Other", description: "Other" },
];

export const CHARGER_LEVELS = [
  {
    id: EVChargingLevels.Level1,
    label: "Level 1",
    power: "2-5 kW",
    description: "120V AC - Slow charging",
  },
  {
    id: EVChargingLevels.Level2,
    label: "Level 2",
    power: "7-22 kW",
    description: "240V AC - Medium speed",
  },
  {
    id: EVChargingLevels.DcFast,
    label: "Level 3 / DC Fast",
    power: "50-350 kW",
    description: "480V DC - Rapid charging",
  },
];
