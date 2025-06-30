import { z } from "zod/v4";
import { Role } from "./enum";

export const signInSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email." })
    .min(1, "Email is required."),
  password: z.string().min(1, "Password is required"),
  role: z.enum(Role, {
    error: "Please select a role.",
  }),
});

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().optional(),
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(8, "Password should have atleast 8 characters")
    .max(20, "Password cannot have more that 20 characters."),
  imageUrl: z.string().optional(),
  terms_conditions: z.boolean(),
});

export const signUpDV: z.infer<typeof signUpSchema> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  imageUrl: "",
  terms_conditions: false,
};

export const ParkingAreaSchema = z.object({
  locationType: z.literal("parking", {
    error: "Please select a location locationType.",
  }),
  name: z.string().min(1, "Name is required."),
  address_line_1: z.string().min(1, "Address is required."),
  address_line_2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  latitude: z.number({ error: "Latitude is required" }),
  longitude: z.number({ error: "Longitude is required" }),
  description: z.string().min(1, "Description is required."),
  amenities: z.array(z.uuid()).optional(),
  total_slots: z
    .number({ error: "Total Slots is required" })
    .positive({ error: "Total Slots should be greater than 0" }),
  parking_area_images: z
    .array(z.file().mime(["image/jpeg", "image/png"]).max(5_242_880))
    .optional(),
});

export const EVChargingShcema = z.object({
  locationType: z.literal("ev", {
    error: "Please select a location type.",
  }),
  name: z.string().min(1, "Name is required."),
  address_line_1: z.string().min(1, "Address is required."),
  address_line_2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  latitude: z.number({ error: "Latitude is required" }),
  longitude: z.number({ error: "Longitude is required" }),
  description: z.string().min(1, "Description is required."),
  amenities: z.array(z.uuid()).optional(),
  total_slots: z
    .number({ error: "Total Slots is required" })
    .positive({ error: "Total Slots should be greater than 0" }),
  ev_charging_images: z
    .array(z.file().mime(["image/jpeg", "image/png"]).max(5_242_880))
    .optional(),
});

export const LocationSchema = z.discriminatedUnion("locationType", [
  ParkingAreaSchema,
  EVChargingShcema,
]);

export const LocationDV: z.infer<typeof LocationSchema> = {
  locationType: "parking",
  name: "",
  address_line_1: "",
  address_line_2: "",
  city: "",
  state: "",
  latitude: 0,
  longitude: 0,
  description: "",
  amenities: [],
  total_slots: 0,
  parking_area_images: [],
};
