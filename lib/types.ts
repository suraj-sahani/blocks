import * as z from "zod";
import { ADD_PARKING_SCHEMA, ENV_SCHEMA } from "./schema";
import { cities, states } from "@/drizzle/schema";

export type ENV = z.infer<typeof ENV_SCHEMA>;

/////////////////////////// Mutations ///////////////////////////
export interface AddParkingAreaSchema
  extends z.infer<typeof ADD_PARKING_SCHEMA> {}

////////////////////////// DTO //////////////////////////////////
export interface State
  extends Omit<typeof states.$inferSelect, "createdAt" | "updatedAt"> {}
export interface City
  extends Omit<typeof cities.$inferSelect, "createdAt" | "updatedAt"> {}
