"use client";
import { AnimatePresence, motion } from "motion/react";
import { Activity, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";
import { DAYS, iconMappings, schedule, VEHICLE_TYPES } from "@/lib/constants";
import clientLogger from "@/lib/pino/client";
import {
  ADD_PARKING_SCHEMA,
  BASIC_LOCATION_SCHEMA,
  PARKING_AREA_CAPACITY_AND_SCHEDULE_SCHEMA,
  PARKING_AREA_SLOT_SCHEMA,
} from "@/lib/schema";
import { AddParkingAreaSchema, Amenities, City, State } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useForm, useStore } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import {
  Bike,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Truck,
} from "lucide-react";
import { FieldInfo } from ".";
import AddressSearch from "../address-search";
import { AutoComplete } from "../ui/auto-complete";
import ImageUpload from "../upload";

type Props = {
  states: State[];
  amenities: Amenities[];
};

export default function AddParkingAreaForm({ states, amenities }: Props) {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm({
    validators: {
      onChange: ADD_PARKING_SCHEMA,
    },
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      totalSlots: 1,
      description: "",
      schedule,
      slots: [
        {
          pricePerDay: 0,
          pricePerWeek: 0,
          pricePerMonth: 0,
          pricePerHour: 0,
          vehicleTypes: [],
        },
      ],
    } as unknown as AddParkingAreaSchema,
    onSubmit: ({ value }) => {
      clientLogger.info(value, "Form values");
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
      title: "Location Details",
      description: "Basic information about your parking",
      schema: BASIC_LOCATION_SCHEMA,
    },
    {
      number: 2,
      title: "Capacity & Amenities",
      description: "Set capacity, amenities and schedule",
      schema: PARKING_AREA_CAPACITY_AND_SCHEDULE_SCHEMA,
    },
    {
      number: 3,
      title: "Slot Configuration",
      description: "Configure individual parking slots",
      schema: PARKING_AREA_SLOT_SCHEMA,
    },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleStepChange = async (step: "prev" | "next") => {
    const actions = {
      prev: prevStep,
      next: nextStep,
    };

    // Allow the user to go to the previous step
    // without validating the current step.
    if (step === "prev") {
      await actions[step]();
      return;
    }

    const values = form.state.values;

    const currentStepSchema = steps[currentStep - 1];

    const result = currentStepSchema.schema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AddParkingAreaSchema;
        //  Implement logic to set errors
        form.setFieldMeta(field, (meta) => ({
          ...meta,
          errorMap: {
            onChange: {
              message: issue.message,
            },
          },
          isTouched: true,
        }));
      });

      clientLogger.info(
        {
          errors: form.state.errors,
          values: form.state.values,
        },
        "Failed to parse Step Schema"
      );

      // Early return to stop from changing page
      return;
    }

    // Create slots for the next step based on the
    // total number of slots entered
    if ("totalSlots" in result.data) {
      const totalSlots = result.data.totalSlots;
      const slots: AddParkingAreaSchema["slots"] = Array.from(
        { length: totalSlots },
        (_, index) => ({
          pricePerDay: 0,
          pricePerHour: 0,
          pricePerMonth: 0,
          pricePerWeek: 0,
          vehicleTypes: [],
        })
      );
      form.setFieldValue("slots", slots);
    }

    await actions[step]();
  };
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          clientLogger.info(form.state.errors);
          form.handleSubmit();
        }}
      >
        {/* Form Steps */}
        <Card variant="default" className="p-6 md:p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Location Details */}
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
                  <h3 className="text-xl font-semibold">Location Details</h3>
                  <p className="text-muted-foreground">
                    Tell us about your parking location
                  </p>
                </div>

                <div className="grid gap-6">
                  <form.Field
                    name="name"
                    children={(field) => (
                      <div className="space-y-2">
                        <Label>Location Name *</Label>
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

            {/* Step 2: Capacity & Amenities */}
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
                  <h3 className="text-xl font-semibold">
                    Capacity & Amenities
                  </h3>
                  <p className="text-muted-foreground">
                    Set your parking capacity and available amenities
                  </p>
                </div>

                {/* Capacity */}
                <form.Field
                  name="totalSlots"
                  children={(field) => (
                    <div className="space-y-3">
                      <Label>Total Parking Capacity *</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const currentSlots = field.state.value;
                            if (currentSlots > 1) {
                              const newCapacity = currentSlots - 1;
                              if (newCapacity) field.handleChange(newCapacity);
                            }
                          }}
                          disabled={field.state.value <= 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <div className="w-20 text-center">
                          <span className="text-3xl font-bold text-primary">
                            {field.state.value}
                          </span>
                          <p className="text-xs text-muted-foreground">spots</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const currentSlots = field.state.value;
                            const newCapacity = currentSlots + 1;
                            field.handleChange(newCapacity);
                          }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                />

                {/* Amenities */}
                <form.Field
                  name="amenities"
                  children={(field) => (
                    <div className="space-y-3">
                      <Label>Amenities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {amenities.map((amenity) => {
                          const Icon =
                            iconMappings?.[
                              amenity.name as keyof typeof iconMappings
                            ]?.icon;
                          return (
                            <motion.button
                              key={amenity.id}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                const currentAmenities =
                                  field.state.value || [];
                                const newAmenities = currentAmenities.includes(
                                  amenity.id
                                )
                                  ? currentAmenities.filter(
                                      (id) => id !== amenity.id
                                    )
                                  : [...currentAmenities, amenity.id];

                                field.handleChange(newAmenities);
                              }}
                              className={`p-3 rounded-xl border-2 text-left transition-all ${
                                (field.state.value || []).includes(amenity.id)
                                  ? "border-primary/50 bg-primary/10 text-primary"
                                  : "border-border hover:border-accent/50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {Icon ? <Icon className="size-4" /> : null}
                                <span className="text-sm font-medium">
                                  {amenity.name}
                                </span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                {/* Schedule */}
                <form.Field
                  name="schedule"
                  mode="array"
                  children={(field) => (
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Operating Hours
                      </Label>
                      <div className="space-y-2">
                        {field.state.value.map((day, index) => {
                          const { isClosed } = day;
                          const scheduleDayLabel = DAYS[index];
                          return (
                            <motion.div
                              key={scheduleDayLabel}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={cn(
                                `flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl border-2 transition-colors`,
                                {
                                  "border-border": !isClosed,
                                  "border-border/50 bg-muted/50": isClosed,
                                }
                              )}
                            >
                              <form.Field name={`schedule[${index}].isClosed`}>
                                {(subField) => (
                                  <div className="flex items-center gap-3">
                                    <Checkbox
                                      checked={subField.state.value}
                                      onCheckedChange={(checked) => {
                                        subField.handleChange(
                                          checked as boolean
                                        );
                                      }}
                                    />
                                    <span
                                      className={`w-20 sm:w-24 font-medium text-sm sm:text-base ${
                                        subField.state.value &&
                                        "text-muted-foreground"
                                      }`}
                                    >
                                      {scheduleDayLabel.slice(0, 3)}
                                      <span className="hidden sm:inline">
                                        {scheduleDayLabel.slice(3)}
                                      </span>
                                    </span>
                                  </div>
                                )}
                              </form.Field>

                              <div className="flex items-center gap-2 flex-1 pl-8 sm:pl-0">
                                <form.Field
                                  name={`schedule[${index}].openingTime`}
                                >
                                  {(subField) => (
                                    <div className="space-y-2">
                                      <Input
                                        type="time"
                                        value={(
                                          subField.state.value || new Date()
                                        )
                                          .toISOString()
                                          .slice(11, 16)}
                                        onChange={(e) => {
                                          if (e.target.valueAsDate)
                                            subField.handleChange(
                                              e.target.valueAsDate
                                            );
                                        }}
                                        disabled={isClosed}
                                        className="flex-1 sm:w-fit sm:flex-none"
                                      />
                                      <FieldInfo field={subField} />
                                    </div>
                                  )}
                                </form.Field>

                                <span className="text-muted-foreground text-sm">
                                  to
                                </span>

                                <form.Field
                                  name={`schedule[${index}].closingTime`}
                                >
                                  {(subField) => (
                                    <div className="spce-y-2">
                                      <Input
                                        type="time"
                                        value={(
                                          subField.state.value || new Date()
                                        )
                                          .toISOString()
                                          .slice(11, 16)}
                                        onChange={(e) => {
                                          if (e.target.valueAsDate)
                                            subField.handleChange(
                                              e.target.valueAsDate
                                            );
                                        }}
                                        disabled={isClosed}
                                        className="flex-1 sm:w-fit sm:flex-none"
                                      />
                                      <FieldInfo field={subField} />
                                    </div>
                                  )}
                                </form.Field>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                />
              </motion.div>
            </Activity>

            {/* Step 3: Slot Configuration */}
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
                  <h3 className="text-xl font-semibold">Slot Configuration</h3>
                  <p className="text-muted-foreground">
                    Configure pricing and vehicle type for each parking slot
                  </p>
                </div>

                <form.Field
                  name="slots"
                  mode="array"
                  children={(field) => (
                    <div className="grid gap-4">
                      {field.state.value.map((_, index) => (
                        <motion.div
                          key={`slots-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 rounded-xl border-2 border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-bold text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <h4 className="font-semibold">Slot #{index + 1}</h4>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Vehicle Type */}
                            <form.Field
                              name={`slots[${index}].vehicleTypes`}
                              children={(subField) => (
                                <div className="space-y-2 col-span-2">
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
                                          onClick={() => {
                                            if (
                                              subField.state.value.includes(
                                                type.id
                                              )
                                            ) {
                                              subField.handleChange(
                                                subField.state.value.filter(
                                                  (id) => id !== type.id
                                                )
                                              );
                                            } else {
                                              subField.handleChange([
                                                ...subField.state.value,
                                                type.id,
                                              ]);
                                            }
                                          }}
                                          className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                                            subField.state.value.includes(
                                              type.id
                                            )
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
                              )}
                            />

                            {/* Hourly Price */}
                            <form.Field
                              name={`slots[${index}].pricePerHour`}
                              children={(subField) => (
                                <div className="space-y-2">
                                  <Label>Price per Hour ($)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="5.00"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(
                                        e.target.valueAsNumber || 0
                                      )
                                    }
                                  />
                                </div>
                              )}
                            />

                            {/* Daily Price */}
                            <form.Field
                              name={`slots[${index}].pricePerDay`}
                              children={(subField) => (
                                <div className="space-y-2">
                                  <Label>Price per Day ($)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="25.00"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(
                                        e.target.valueAsNumber || 0
                                      )
                                    }
                                  />
                                </div>
                              )}
                            />

                            {/* Weekly Price */}
                            <form.Field
                              name={`slots[${index}].pricePerWeek`}
                              children={(subField) => (
                                <div className="space-y-2">
                                  <Label>Price per Week ($)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="25.00"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(
                                        e.target.valueAsNumber || 0
                                      )
                                    }
                                  />
                                </div>
                              )}
                            />

                            {/* Monthly Price */}
                            <form.Field
                              name={`slots[${index}].pricePerMonth`}
                              children={(subField) => (
                                <div className="space-y-2">
                                  <Label>Price per Month ($)</Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="25.00"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(
                                        e.target.valueAsNumber || 0
                                      )
                                    }
                                  />
                                </div>
                              )}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                />

                {/* Quick Actions */}
                <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                  <p className="text-sm font-medium">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const firstSlot = form.state.values.slots[0];
                        const {
                          pricePerDay,
                          pricePerHour,
                          pricePerMonth,
                          pricePerWeek,
                        } = firstSlot;

                        const updatedSlothWithSamePrice =
                          form.state.values.slots.map((slot) => ({
                            ...slot,
                            pricePerDay,
                            pricePerHour,
                            pricePerMonth,
                            pricePerWeek,
                          }));

                        form.setFieldValue("slots", updatedSlothWithSamePrice);
                      }}
                    >
                      Apply first slot pricing to all
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const firstSlot = form.state.values.slots[0];
                        const { vehicleTypes } = firstSlot;

                        const updatedSlothWithSameVehicleType =
                          form.state.values.slots.map((slot) => ({
                            ...slot,
                            vehicleTypes,
                          }));

                        form.setFieldValue(
                          "slots",
                          updatedSlothWithSameVehicleType
                        );
                      }}
                    >
                      Apply first slot vehicle type to all
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Activity>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleStepChange("prev")}
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
                onClick={() => handleStepChange("next")}
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
      </form>
    </div>
  );
}
