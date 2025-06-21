import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { Role } from "./enum";
import { evChargingTable, parkingAreaTable } from "@/drizzle/schema";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
  password: z.string().min(1, "Password is required"),
  role: z.enum([Role.USER, Role.HOST], { required_error: "Role is required." }),
});

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),
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

export const LocationType = z.enum(["parking", "ev"]);
export const ParkingLocationSchema = createSelectSchema(parkingAreaTable)
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    host_id: true,
    city_id: true,
    state_id: true,
  })
  .extend({
    locationType: LocationType.enum.parking,
  });

export const EVChargingSchema = createSelectSchema(evChargingTable)
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    city_id: true,
    state_id: true,
    host_id: true,
  })
  .extend({
    locationType: LocationType.enum.ev,
  });
