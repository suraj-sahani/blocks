"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clientLogger from "@/lib/pino/client";
import {
  ADD_EV_SCHEMA_V2,
  BASIC_LOCATION_SCHEMA,
  EV_STATION_CAPACITY_AND_SCHEDULE_SCHEMA,
  EV_STATION_SLOT_SCHEMA,
} from "@/lib/schema";
import { AddEVSchemaV2, City, State } from "@/lib/types";
import { useForm, useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import {
  Battery,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Activity, useState } from "react";
import { FieldInfo } from ".";
import AddressSearch from "../address-search";
import { AutoComplete } from "../ui/auto-complete";
import ImageUpload from "../upload";

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
type Props = {
  states: State[];
};
export default function AddEvStationFormV2({ states }: Props) {
  const [currentStep, setCurrentStep] = useState(1);

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

  const form = useForm({
    validators: {
      onChange: ADD_EV_SCHEMA_V2,
    },
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      totalConnectors: 1,
      description: "",
      schedule: [
        {
          dayOfWeek: 1,
          isClosed: false,
          openingTime: new Date(),
          closingTime: new Date(),
        },
      ],
      connectors: [
        {
          vehicleTypes: [],
          priceKwPerHour: 0,
          maxPower: 0,
        },
      ],
    } as unknown as AddEVSchemaV2,
    onSubmit: ({ value }) => {
      clientLogger.info(value);
    },
  });

  const stateID = useStore(form.store, (state) => state.values.state);

  const getCitiesForState = async (stateID: string): Promise<City[]> => {
    const res = await fetch(`/api/state/${stateID}/cities`);

    if (!res.ok) throw new Error(`Request failed with status:${res.status}`);

    const data: { success: boolean; data: City[] } = await res.json();

    return data.data;
  };

  const { data, isFetching } = useQuery({
    queryKey: [stateID],
    queryFn: () => getCitiesForState(stateID),
    enabled: stateID ? true : false,
  });

  const cityList =
    data?.map((city) => ({
      label: city.name,
      value: city.name,
      id: city.id,
    })) || [];

  const formattedStates = states.map((state) => ({
    label: `${state.name}(${state.abbreviation})`,
    value: state.name,
    id: state.id,
  }));

  const steps = [
    {
      number: 1,
      title: "Station Details",
      description: "Basic information about your EV station",
      schema: BASIC_LOCATION_SCHEMA,
    },
    {
      number: 2,
      title: "Capacity & Amenities",
      description: "Set capacity, amenities and schedule",
      schema: EV_STATION_CAPACITY_AND_SCHEDULE_SCHEMA,
    },
    {
      number: 3,
      title: "Port Configuration",
      description: "Configure individual charging ports",
      schema: EV_STATION_SLOT_SCHEMA,
    },
  ];

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

  const handleStepChange = async () => {
    const values = form.state.values;

    const currentStepSchema = steps[currentStep - 1];

    const result = currentStepSchema.schema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AddEVSchemaV2;
        //  Implement logic to set errors
      });
    }
  };

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        <Card variant="default" className="p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Station Details */}
            <Activity
              mode={currentStep === 1 ? "visible" : "hidden"}
              key="step1"
            >
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
                  <form.Field
                    name="name"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label>Station Name *</Label>
                        <Input
                          placeholder="e.g., Downtown EV Supercharger Hub"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />

                  <form.Field
                    name="description"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label>Description *</Label>
                        <textarea
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background resize-none focus:border-accent focus:outline-none transition-colors"
                          rows={4}
                          placeholder="Describe your charging station, available connectors, nearby amenities..."
                        />
                        <FieldInfo field={field} />
                      </div>
                    )}
                  />

                  <form.Field
                    name="address"
                    children={(field) => {
                      return (
                        <div className="space-y-1">
                          <Label htmlFor={"Full Address"}>
                            {"Full Address"}
                          </Label>
                          <AddressSearch
                            onSearchChange={(e) => field.handleChange(e)}
                            value={field.state.value}
                            placeholder="Street Adress"
                            onPlaceSelect={(place) => {
                              const { geometry, address_components } = place;

                              const location = geometry?.location
                                ? {
                                    lat: geometry.location.lat(),
                                    lng: geometry.location.lng(),
                                  }
                                : undefined;

                              if (location?.lat)
                                form.setFieldValue("latitude", location.lat);
                              if (location?.lng)
                                form.setFieldValue("longitude", location.lng);

                              if (address_components) {
                                for (const comp of address_components) {
                                  if (comp.types.includes("postal_code"))
                                    form.setFieldValue(
                                      "zipcode",
                                      comp.long_name || comp.short_name
                                    );
                                }
                              }

                              const address = place.formatted_address;
                              if (address) field.handleChange(address || "");
                            }}
                          />
                          <FieldInfo field={field} />
                        </div>
                      );
                    }}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <form.Field
                      name="latitude"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label>Latitude</Label>
                          <Input
                            type="number"
                            step="any"
                            placeholder="e.g., 40.7128"
                            value={field.state.value || ""}
                            onChange={(e) =>
                              field.handleChange(e.target.valueAsNumber)
                            }
                          />
                          <FieldInfo field={field} />
                        </div>
                      )}
                    />

                    <form.Field
                      name="longitude"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label>Longitude</Label>
                          <Input
                            type="number"
                            step="any"
                            placeholder="e.g., -74.0060"
                            value={field.state.value || ""}
                            onChange={(e) =>
                              field.handleChange(e.target.valueAsNumber)
                            }
                          />
                          <FieldInfo field={field} />
                        </div>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <form.Field
                      name="city"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={"City"}>City*</Label>
                          <AutoComplete
                            key={field.name}
                            options={cityList}
                            placeholder="Select city"
                            value={field.state.value}
                            disabled={isFetching || !stateID}
                            loading={isFetching}
                            onSelectOption={(val) => {
                              const selectedCity = cityList.find(
                                (city) => city.label === val
                              );
                              if (selectedCity)
                                field.handleChange(selectedCity.id);
                            }}
                          />
                          <FieldInfo field={field} />
                        </div>
                      )}
                    />
                    <form.Field
                      name="state"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={"State"}>State*</Label>
                          <AutoComplete
                            key={field.name}
                            options={formattedStates}
                            placeholder="Select state"
                            value={field.state.value}
                            onSelectOption={(val) => {
                              const selectedState = states.find(
                                (state) => state.name === val
                              );
                              if (selectedState)
                                field.handleChange(selectedState?.id);
                            }}
                          />
                          <FieldInfo field={field} />
                        </div>
                      )}
                    />
                    <form.Field
                      name="zipcode"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label htmlFor={"ZIP Code"}>ZIP Code</Label>
                          <Input
                            name={field.name}
                            type="text"
                            value={field.state.value || ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          <FieldInfo field={field} />
                        </div>
                      )}
                    />
                  </div>

                  <form.Field
                    name="images"
                    children={(field) => (
                      <div className="space-y-3">
                        <Label>Photos *</Label>
                        <ImageUpload
                          multiple
                          onChange={(e) => field.handleChange(e)}
                          value={field.state.value || []}
                        />
                      </div>
                    )}
                  />
                </div>
              </motion.div>
            </Activity>

            {/* Step 3: Capacity & Amenities */}
            <Activity
              mode={currentStep === 2 ? "visible" : "hidden"}
              key="step2"
            >
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
            </Activity>

            {/* Step 3: Port Configuration */}
            <Activity
              mode={currentStep === 3 ? "visible" : "hidden"}
              key="step3"
            >
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
                                  updatePort(
                                    port.id,
                                    "maxPower",
                                    e.target.value
                                  )
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
                                updatePort(
                                  port.id,
                                  "pricePerKwh",
                                  e.target.value
                                )
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
            </Activity>
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
      </form>
    </div>
  );
}
