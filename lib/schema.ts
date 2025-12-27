import * as z from "zod";

export const ENV_SCHEMA = z.object({
  GOOGLE_CLIENT_ID: z
    .string()
    .nonempty({ error: "GOOGLE_CLIENT_ID is required." }),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .nonempty({ error: "GOOGLE_CLIENT_SECRET is required." }),
  NEXT_PUBLIC_GOOGLE_MAPS_KEY: z
    .string()
    .nonempty({ error: "GOOGLE_MAPS_KEY is required." }),
  BETTER_AUTH_SECRET: z
    .string()
    .nonempty({ error: "BETTER_AUTH_SECRET is required." }),
  BETTER_AUTH_URL: z
    .string()
    .nonempty({ error: "BETTER_AUTH_URL is required" }),
  DATABASE_URL: z.string().nonempty("DATABASE_URL is required."),
  IMAGEKIT_PUBLIC_KEY: z
    .string()
    .nonempty({ error: "IMAGEKIT_PUBLIC_KEY is required." }),
  IMAGEKIT_PRIVATE_KEY: z
    .string()
    .nonempty({ error: "IMAGEKIT_PRIVATE_KEY is required." }),
  NEXT_PUBLIC_IMAGEKIT_URL: z.string().nonempty("IMAGEKIT_URL is required."),
  NEXT_PUBLIC_SERVER_URL: z.string().nonempty("SERVER_URL is required."),
});

export const SIGN_IN_SCHEMA = z.object({
  email: z.email().nonempty({ error: "Email is required." }),
  password: z.string().nonempty({ error: "Password is required." }),
});

export const SIGN_UP_SCHEMA = z.object({
  fullName: z.string().trim().nonempty({ error: "First name is required." }),
  email: z.email().nonempty({ error: "Email is required." }),
  password: z.string().nonempty({ error: "Password is required." }),
  agreeToTerms: z.boolean({
    error: "Please agree to our terms and conditions to continue.",
  }),
  signUpType: z.enum(["user", "host"], { error: "Sign up type is required." }),
});

export const ADD_PARKING_SCHEMA = z.object({
  name: z.string().trim().nonempty({ error: "Name is required." }),
  address: z.string().trim().nonempty({ error: "Name is required" }),
  city: z
    .string({ error: "City is required." })
    .nonempty({ error: "City is required." }),
  state: z
    .string({ error: "City is required." })
    .nonempty({ error: "State is required." }),
  zipcode: z.string().trim().optional(),
  latitude: z.number({ error: "Latitude is required" }),
  longitude: z.number({ error: "Longitude is required" }),
  totalSlots: z
    .number({ error: "Total slots is required." })
    .min(1, { error: "Total slots must be a minimun of 1" }),
  description: z.string().trim().optional(),
  openingTime: z.date({ error: "Opening Time is required." }),
  closingTime: z.date({ error: "Closing time is required." }),
  images: z.array(z.file()).optional(),
});

export const ADD_EV_SCHEMA = z.object({
  name: z.string().trim().nonempty({ error: "Name is required." }),
  address: z.string().trim().nonempty({ error: "Name is required" }),
  city: z
    .string({ error: "City is required." })
    .nonempty({ error: "City is required." }),
  state: z
    .string({ error: "City is required." })
    .nonempty({ error: "State is required." }),
  zipcode: z.string().trim().optional(),
  latitude: z.number({ error: "Latitude is required" }),
  longitude: z.number({ error: "Longitude is required" }),
  description: z.string().trim().optional(),
  openingTime: z.date({ error: "Opening Time is required." }),
  closingTime: z.date({ error: "Closing time is required." }),
  images: z.array(z.file()).optional(),
  totalConnectors: z
    .number({ error: "Total connectors is required." })
    .min(1, { error: "Total connectors must be a minimun of 1" }),
});
