import * as z from "zod";

export const ENV_SCHEMA = z.object({
  GOOGLE_CLIENT_ID: z.string().nonempty({ error: "GOOGLE_CLIENT_ID is required." }),
  GOOGLE_CLIENT_SECRET: z.string().nonempty({ error: "GOOGLE_CLIENT_SECRET is required." }),
  BETTER_AUTH_SECRET: z.string().nonempty({ error: "BETTER_AUTH_SECRET is required." }),
  BETTER_AUTH_URL: z.string().nonempty({ error: "BETTER_AUTH_URL is required" }),
  DATABASE_URL: z.string().nonempty("DATABASE_URL is required.")
})

export const SIGN_IN_SCHEMA = z.object({})

export const ADD_PARKING_SCHEMA = z.object({
  name: z.string().trim().nonempty({ error: "Name is required." }),
  address: z.string().trim().nonempty({ error: "Name is required" }),
  city: z.number().min(1, { error: "City is required." }),
  state: z.number().min(1, { error: "State is required." }),
  zipcode: z.string().trim().nonempty({ error: "Zipcode is required." }),
  latitude: z.number({ error: "Latitude is required" }),
  longitude: z.number({ error: "Longitude is required" }),
  totalSlots: z.number().min(1, { error: "Total slots must be a minimun of 1" }),
  description: z.string().trim().optional(),
  openingTime: z.date({ error: "Opening Time is required." }),
  closingTime: z.date({ error: "Closing time is required." })
})
