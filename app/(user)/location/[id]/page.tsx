"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  MapPin,
  Star,
  Clock,
  Car,
  Zap,
  Shield,
  Wifi,
  Camera,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Calendar,
  Navigation,
  Check,
  Info,
  Battery,
  Gauge,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const mockLocation = {
  id: 1,
  name: "Downtown Parking Garage",
  address: "123 Main Street, Downtown, New York, NY 10001",
  type: "parking",
  price: 5,
  priceUnit: "hour",
  dailyRate: 25,
  monthlyRate: 350,
  rating: 4.8,
  reviews: 234,
  description:
    "Premium parking facility in the heart of downtown. Our multi-level garage offers secure, covered parking with 24/7 access and surveillance. Perfect for daily commuters and visitors alike.",
  available: 12,
  totalSpots: 150,
  features: [
    { icon: Shield, label: "24/7 Security" },
    { icon: Camera, label: "CCTV Surveillance" },
    { icon: Wifi, label: "Free WiFi" },
    { icon: Zap, label: "EV Charging Available" },
  ],
  amenities: [
    "Covered Parking",
    "Elevator Access",
    "Wheelchair Accessible",
    "Valet Service",
    "Car Wash",
    "Restrooms",
  ],
  hours: {
    weekdays: "24 hours",
    weekends: "24 hours",
  },
  images: [
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=600&fit=crop",
  ],
  evSpecs: {
    chargerType: "Level 2 & Level 3",
    power: "Up to 150kW",
    connectors: ["CCS", "CHAdeMO", "Tesla"],
    estimatedTime: "30-60 min for 80%",
  },
  host: {
    name: "Metro Parking Inc.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    verified: true,
    responseTime: "Usually responds within 1 hour",
    joinedDate: "2019",
  },
  reviewsList: [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent parking facility! Clean, secure, and well-lit. The EV charging was a bonus.",
    },
    {
      id: 2,
      user: "Michael R.",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good location and fair prices. Sometimes gets busy during rush hours but overall great.",
    },
    {
      id: 3,
      user: "Emily L.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Been using this garage for my daily commute for 6 months. Never had an issue!",
    },
  ],
};

const LocationDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockLocation.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + mockLocation.images.length) % mockLocation.images.length
    );
  };

  return (
    <>
      <div className="pt-20 min-h-screen">
        {/* Image Gallery */}
        <div className="relative h-[50vh] lg:h-[60vh] bg-muted">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={mockLocation.images[currentImageIndex]}
            alt={mockLocation.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {mockLocation.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "w-8 bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="glass"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="glass" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Back Button */}
          <Link
            href="/search"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      mockLocation.type === "ev"
                        ? "bg-green-100 text-green-700"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {mockLocation.type === "ev" ? (
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" /> EV Charging
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Car className="w-3 h-3" /> Parking
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {mockLocation.available} spots available
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  {mockLocation.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {mockLocation.address}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold">{mockLocation.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockLocation.reviewsList.length} reviews)
                    </span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <Card variant="default" className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  About This Location
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {mockLocation.description}
                </p>
              </Card>

              {/* Features */}
              <Card variant="default" className="p-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockLocation.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Amenities */}
              <Card variant="default" className="p-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockLocation.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* EV Specs */}
              <Card variant="default" className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Battery className="w-5 h-5 text-green-500" />
                  EV Charging Specifications
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Charger Type
                    </p>
                    <p className="font-medium">
                      {mockLocation.evSpecs.chargerType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Maximum Power
                    </p>
                    <p className="font-medium">{mockLocation.evSpecs.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Connectors</p>
                    <p className="font-medium">
                      {mockLocation.evSpecs.connectors.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Charge Time
                    </p>
                    <p className="font-medium">
                      {mockLocation.evSpecs.estimatedTime}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Hours */}
              <Card variant="default" className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Operating Hours
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday - Friday
                    </span>
                    <span className="font-medium">
                      {mockLocation.hours.weekdays}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Saturday - Sunday
                    </span>
                    <span className="font-medium">
                      {mockLocation.hours.weekends}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Reviews */}
              <Card variant="default" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
                <div className="space-y-6">
                  {mockLocation.reviewsList.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-border pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-teal-400 flex items-center justify-center text-primary-foreground font-semibold">
                          {review.user[0]}
                        </div>
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {review.date}
                          </p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-accent text-accent"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="p-6 sticky top-24">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ${mockLocation.price}
                  </span>
                  <span className="text-muted-foreground">
                    /{mockLocation.priceUnit}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Rate</span>
                    <span className="font-medium">
                      ${mockLocation.dailyRate}/day
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Rate</span>
                    <span className="font-medium">
                      ${mockLocation.monthlyRate}/month
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-6 mb-6">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">
                        Check-in
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">
                        Check-out
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mb-4"
                  asChild
                >
                  <Link href={`/booking/${mockLocation.id}`}>Reserve Now</Link>
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  You won't be charged yet
                </p>

                {/* Host Info */}
                <div className="border-t border-border mt-6 pt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={mockLocation.host.image}
                      alt={mockLocation.host.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold flex items-center gap-1">
                        {mockLocation.host.name}
                        {mockLocation.host.verified && (
                          <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-primary-foreground" />
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Host since {mockLocation.host.joinedDate}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    {mockLocation.host.responseTime}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetails;
