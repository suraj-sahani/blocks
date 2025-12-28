"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  MapPin,
  Upload,
  Plus,
  Check,
  ChevronRight,
  ChevronLeft,
  Clock,
  Car,
  Bike,
  Truck,
  X,
  ImageIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const VEHICLE_TYPES = [
  { id: "sedan", label: "Sedan", icon: Car },
  { id: "suv", label: "SUV", icon: Car },
  { id: "truck", label: "Truck", icon: Truck },
  { id: "motorcycle", label: "Motorcycle", icon: Bike },
  { id: "compact", label: "Compact", icon: Car },
];

const AMENITIES = [
  "Covered Parking",
  "24/7 Access",
  "Security Guard",
  "CCTV Surveillance",
  "Well Lit",
  "Elevator Access",
  "EV Charging",
  "Valet Service",
  "Car Wash",
  "Wheelchair Accessible",
  "Restrooms",
  "WiFi",
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface ParkingSlot {
  id: number;
  vehicleType: string;
  pricePerHour: string;
  pricePerDay: string;
}

export default function AddParkingAreaFormV2() {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [capacity, setCapacity] = useState(1);
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([
    { id: 1, vehicleType: "sedan", pricePerHour: "", pricePerDay: "" },
  ]);
  const [schedule, setSchedule] = useState(
    DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { enabled: true, open: "08:00", close: "22:00" },
      }),
      {} as Record<string, { enabled: boolean; open: string; close: string }>
    )
  );

  const steps = [
    {
      number: 1,
      title: "Location Details",
      description: "Basic information about your parking",
    },
    {
      number: 2,
      title: "Capacity & Amenities",
      description: "Set capacity, amenities and schedule",
    },
    {
      number: 3,
      title: "Slot Configuration",
      description: "Configure individual parking slots",
    },
  ];

  const handleImageUpload = () => {
    const newImage = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`;
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const updateSchedule = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const updateCapacity = (newCapacity: number) => {
    setCapacity(newCapacity);
    const newSlots: ParkingSlot[] = [];
    for (let i = 1; i <= newCapacity; i++) {
      const existing = parkingSlots.find((s) => s.id === i);
      newSlots.push(
        existing || {
          id: i,
          vehicleType: "sedan",
          pricePerHour: "",
          pricePerDay: "",
        }
      );
    }
    setParkingSlots(newSlots);
  };

  const updateSlot = (id: number, field: keyof ParkingSlot, value: string) => {
    setParkingSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-colors ${
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.number
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-card border-2 border-border text-muted-foreground"
                }`}
                initial={false}
                animate={{
                  scale: currentStep === step.number ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </motion.div>
              <div className="mt-3 text-center">
                <p
                  className={`font-medium ${
                    currentStep >= step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <Card variant="default" className="p-6 md:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* Step 1: Location Details */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Location Details</h3>
                <p className="text-muted-foreground">
                  Tell us about your parking location
                </p>
              </div>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label>Location Name *</Label>
                  <Input placeholder="e.g., Downtown Secure Parking" />
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background resize-none focus:border-primary focus:outline-none transition-colors"
                    rows={4}
                    placeholder="Describe your parking location, nearby landmarks, and any special instructions..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Full Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Street address" className="pl-10" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Latitude</Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g., 40.7128"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Longitude</Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="e.g., -74.0060"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City *</Label>
                    <Input placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Input placeholder="State" />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP Code *</Label>
                    <Input placeholder="ZIP Code" />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <Label>Photos *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-xl overflow-hidden group"
                      >
                        <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleImageUpload}
                      className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 transition-colors bg-muted/30"
                    >
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Add Photo
                      </span>
                    </motion.button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload at least 3 photos of your parking location
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Capacity & Amenities */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Capacity & Amenities</h3>
                <p className="text-muted-foreground">
                  Set your parking capacity and available amenities
                </p>
              </div>

              {/* Capacity */}
              <div className="space-y-3">
                <Label>Total Parking Capacity *</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateCapacity(Math.max(1, capacity - 1))}
                    disabled={capacity <= 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="w-20 text-center">
                    <span className="text-3xl font-bold text-primary">
                      {capacity}
                    </span>
                    <p className="text-xs text-muted-foreground">spots</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => updateCapacity(capacity + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITIES.map((amenity) => (
                    <motion.button
                      key={amenity}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        selectedAmenities.includes(amenity)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center ${
                            selectedAmenities.includes(amenity)
                              ? "bg-primary text-primary-foreground"
                              : "border-2 border-border"
                          }`}
                        >
                          {selectedAmenities.includes(amenity) && (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Operating Hours
                </Label>
                <div className="space-y-2">
                  {DAYS.map((day) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-colors ${
                        schedule[day].enabled
                          ? "border-border"
                          : "border-border/50 bg-muted/30"
                      }`}
                    >
                      <Checkbox
                        checked={schedule[day].enabled}
                        onCheckedChange={(checked) =>
                          updateSchedule(day, "enabled", checked as boolean)
                        }
                      />
                      <span
                        className={`w-24 font-medium ${
                          !schedule[day].enabled && "text-muted-foreground"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="time"
                          value={schedule[day].open}
                          onChange={(e) =>
                            updateSchedule(day, "open", e.target.value)
                          }
                          disabled={!schedule[day].enabled}
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={schedule[day].close}
                          onChange={(e) =>
                            updateSchedule(day, "close", e.target.value)
                          }
                          disabled={!schedule[day].enabled}
                          className="w-32"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Slot Configuration */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Slot Configuration</h3>
                <p className="text-muted-foreground">
                  Configure pricing and vehicle type for each parking slot
                </p>
              </div>

              <div className="grid gap-4">
                {parkingSlots.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">
                          {slot.id}
                        </span>
                      </div>
                      <h4 className="font-semibold">Slot #{slot.id}</h4>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Vehicle Type */}
                      <div className="space-y-2">
                        <Label>Vehicle Type</Label>
                        <div className="flex flex-wrap gap-2">
                          {VEHICLE_TYPES.map((type) => {
                            const Icon = type.icon;
                            return (
                              <motion.button
                                key={type.id}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  updateSlot(slot.id, "vehicleType", type.id)
                                }
                                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                                  slot.vehicleType === type.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                {type.label}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Hourly Price */}
                      <div className="space-y-2">
                        <Label>Price per Hour ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="5.00"
                          value={slot.pricePerHour}
                          onChange={(e) =>
                            updateSlot(slot.id, "pricePerHour", e.target.value)
                          }
                        />
                      </div>

                      {/* Daily Price */}
                      <div className="space-y-2">
                        <Label>Price per Day ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="25.00"
                          value={slot.pricePerDay}
                          onChange={(e) =>
                            updateSlot(slot.id, "pricePerDay", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                <p className="text-sm font-medium">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const firstSlot = parkingSlots[0];
                      setParkingSlots((prev) =>
                        prev.map((s) => ({
                          ...s,
                          pricePerHour: firstSlot.pricePerHour,
                          pricePerDay: firstSlot.pricePerDay,
                        }))
                      );
                    }}
                  >
                    Apply first slot pricing to all
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const firstSlot = parkingSlots[0];
                      setParkingSlots((prev) =>
                        prev.map((s) => ({
                          ...s,
                          vehicleType: firstSlot.vehicleType,
                        }))
                      );
                    }}
                  >
                    Apply first slot vehicle type to all
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              type="button"
              variant="hero"
              onClick={nextStep}
              className="gap-2"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" variant="hero" className="gap-2">
                <Plus className="w-4 h-4" />
                Publish Listing
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
