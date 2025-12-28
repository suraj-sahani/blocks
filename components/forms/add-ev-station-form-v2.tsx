"use client";
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
  Zap,
  X,
  ImageIcon,
  Battery,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const CONNECTOR_TYPES = [
  { id: "ccs", label: "CCS", description: "Combined Charging System" },
  { id: "chademo", label: "CHAdeMO", description: "DC Fast Charging" },
  { id: "tesla", label: "Tesla", description: "Tesla Supercharger" },
  { id: "j1772", label: "J1772", description: "Level 1 & 2" },
  { id: "type2", label: "Type 2", description: "European Standard" },
  { id: "nacs", label: "NACS", description: "North American" },
];

const CHARGER_LEVELS = [
  {
    id: "level1",
    label: "Level 1",
    power: "2-5 kW",
    description: "120V AC - Slow charging",
  },
  {
    id: "level2",
    label: "Level 2",
    power: "7-22 kW",
    description: "240V AC - Medium speed",
  },
  {
    id: "level3",
    label: "Level 3 / DC Fast",
    power: "50-350 kW",
    description: "480V DC - Rapid charging",
  },
];

const AMENITIES = [
  "Covered Area",
  "24/7 Access",
  "Security Guard",
  "CCTV Surveillance",
  "Well Lit",
  "Restrooms",
  "WiFi",
  "Waiting Lounge",
  "Vending Machines",
  "Wheelchair Accessible",
  "Pet Friendly",
  "Food Nearby",
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

interface ChargingPort {
  id: number;
  connectorType: string;
  chargerLevel: string;
  maxPower: string;
  pricePerKwh: string;
}

export default function AddEvStationFormV2() {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [capacity, setCapacity] = useState(1);
  const [chargingPorts, setChargingPorts] = useState<ChargingPort[]>([
    {
      id: 1,
      connectorType: "ccs",
      chargerLevel: "level2",
      maxPower: "",
      pricePerKwh: "",
    },
  ]);
  const [schedule, setSchedule] = useState(
    DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { enabled: true, open: "00:00", close: "23:59" },
      }),
      {} as Record<string, { enabled: boolean; open: string; close: string }>
    )
  );

  const steps = [
    {
      number: 1,
      title: "Station Details",
      description: "Basic information about your EV station",
    },
    {
      number: 2,
      title: "Capacity & Amenities",
      description: "Set capacity, amenities and schedule",
    },
    {
      number: 3,
      title: "Port Configuration",
      description: "Configure individual charging ports",
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
    const newPorts: ChargingPort[] = [];
    for (let i = 1; i <= newCapacity; i++) {
      const existing = chargingPorts.find((p) => p.id === i);
      newPorts.push(
        existing || {
          id: i,
          connectorType: "ccs",
          chargerLevel: "level2",
          maxPower: "",
          pricePerKwh: "",
        }
      );
    }
    setChargingPorts(newPorts);
  };

  const updatePort = (id: number, field: keyof ChargingPort, value: string) => {
    setChargingPorts((prev) =>
      prev.map((port) => (port.id === id ? { ...port, [field]: value } : port))
    );
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 sm:top-6 left-0 right-0 h-0.5 bg-border">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              <motion.div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-base sm:text-lg transition-colors ${
                  currentStep > step.number
                    ? "bg-accent text-accent-foreground"
                    : currentStep === step.number
                    ? "bg-accent text-accent-foreground ring-4 ring-accent/20"
                    : "bg-card border-2 border-border text-muted-foreground"
                }`}
                initial={false}
                animate={{
                  scale: currentStep === step.number ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {currentStep > step.number ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  step.number
                )}
              </motion.div>
              <div className="mt-2 sm:mt-3 text-center px-1">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 hidden md:block">
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
          {/* Step 1: Station Details */}
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
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Station Details
                </h3>
                <p className="text-muted-foreground">
                  Tell us about your EV charging station
                </p>
              </div>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label>Station Name *</Label>
                  <Input placeholder="e.g., Downtown EV Supercharger Hub" />
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background resize-none focus:border-accent focus:outline-none transition-colors"
                    rows={4}
                    placeholder="Describe your charging station, available connectors, nearby amenities..."
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
                        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
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
                      className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-accent/50 flex flex-col items-center justify-center gap-2 transition-colors bg-muted/30"
                    >
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Add Photo
                      </span>
                    </motion.button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload at least 3 photos of your charging station
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
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Battery className="w-5 h-5 text-accent" />
                  Capacity & Amenities
                </h3>
                <p className="text-muted-foreground">
                  Set your charging capacity and available amenities
                </p>
              </div>

              {/* Capacity */}
              <div className="space-y-3">
                <Label>Total Charging Ports *</Label>
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
                    <span className="text-3xl font-bold text-accent">
                      {capacity}
                    </span>
                    <p className="text-xs text-muted-foreground">ports</p>
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
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center ${
                            selectedAmenities.includes(amenity)
                              ? "bg-accent text-accent-foreground"
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
                      className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl border-2 transition-colors ${
                        schedule[day].enabled
                          ? "border-border"
                          : "border-border/50 bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={schedule[day].enabled}
                          onCheckedChange={(checked) =>
                            updateSchedule(day, "enabled", checked as boolean)
                          }
                        />
                        <span
                          className={`w-20 sm:w-24 font-medium text-sm sm:text-base ${
                            !schedule[day].enabled && "text-muted-foreground"
                          }`}
                        >
                          {day.slice(0, 3)}
                          <span className="hidden sm:inline">
                            {day.slice(3)}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-1 pl-8 sm:pl-0">
                        <Input
                          type="time"
                          value={schedule[day].open}
                          onChange={(e) =>
                            updateSchedule(day, "open", e.target.value)
                          }
                          disabled={!schedule[day].enabled}
                          className="flex-1 sm:w-28 sm:flex-none"
                        />
                        <span className="text-muted-foreground text-sm">
                          to
                        </span>
                        <Input
                          type="time"
                          value={schedule[day].close}
                          onChange={(e) =>
                            updateSchedule(day, "close", e.target.value)
                          }
                          disabled={!schedule[day].enabled}
                          className="flex-1 sm:w-28 sm:flex-none"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Port Configuration */}
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
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Port Configuration
                </h3>
                <p className="text-muted-foreground">
                  Configure each charging port with connector type and pricing
                </p>
              </div>

              <div className="grid gap-4">
                {chargingPorts.map((port, index) => (
                  <motion.div
                    key={port.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 sm:p-4 rounded-xl border-2 border-border hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                      </div>
                      <h4 className="font-semibold text-sm sm:text-base">
                        Charging Port #{port.id}
                      </h4>
                    </div>

                    <div className="grid gap-4">
                      {/* Connector Type */}
                      <div className="space-y-2">
                        <Label className="text-sm">Connector Type</Label>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {CONNECTOR_TYPES.map((type) => (
                            <motion.button
                              key={type.id}
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                updatePort(port.id, "connectorType", type.id)
                              }
                              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                                port.connectorType === type.id
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-muted hover:bg-muted/80"
                              }`}
                            >
                              {type.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Charger Level */}
                      <div className="space-y-2">
                        <Label className="text-sm">Charger Level</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {CHARGER_LEVELS.map((level) => (
                            <motion.button
                              key={level.id}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                updatePort(port.id, "chargerLevel", level.id)
                              }
                              className={`p-2.5 sm:p-3 rounded-lg text-left transition-all ${
                                port.chargerLevel === level.id
                                  ? "bg-accent/10 border-2 border-accent"
                                  : "bg-muted border-2 border-transparent hover:bg-muted/80"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {level.label}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {level.power}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                                {level.description}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {/* Max Power */}
                        <div className="space-y-2">
                          <Label className="text-sm">Max Power (kW)</Label>
                          <div className="relative">
                            <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="150"
                              value={port.maxPower}
                              onChange={(e) =>
                                updatePort(port.id, "maxPower", e.target.value)
                              }
                              className="pl-10"
                            />
                          </div>
                        </div>

                        {/* Price per kWh */}
                        <div className="space-y-2">
                          <Label className="text-sm">Price/kWh ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.35"
                            value={port.pricePerKwh}
                            onChange={(e) =>
                              updatePort(port.id, "pricePerKwh", e.target.value)
                            }
                          />
                        </div>
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
                      const firstPort = chargingPorts[0];
                      setChargingPorts((prev) =>
                        prev.map((p) => ({
                          ...p,
                          pricePerKwh: firstPort.pricePerKwh,
                          maxPower: firstPort.maxPower,
                        }))
                      );
                    }}
                  >
                    Apply first port pricing to all
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const firstPort = chargingPorts[0];
                      setChargingPorts((prev) =>
                        prev.map((p) => ({
                          ...p,
                          connectorType: firstPort.connectorType,
                          chargerLevel: firstPort.chargerLevel,
                        }))
                      );
                    }}
                  >
                    Apply first port config to all
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2 w-full sm:w-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              type="button"
              variant="accent"
              onClick={nextStep}
              className="gap-2 w-full sm:w-auto"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                variant="accent"
                className="gap-2 w-full sm:w-auto order-1 sm:order-2"
              >
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
