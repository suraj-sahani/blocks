import * as z from "zod";
import {
  ADD_EV_SCHEMA,
  ADD_PARKING_SCHEMA,
  ENV_SCHEMA,
  SIGN_IN_SCHEMA,
  SIGN_UP_SCHEMA,
} from "./schema";
import { cities, states } from "@/drizzle/schema";
import { mockLocations } from "./constants";

export type ENV = z.infer<typeof ENV_SCHEMA>;

/////////////////////////// Mutations ///////////////////////////
export interface SignUpSchema extends z.infer<typeof SIGN_UP_SCHEMA> {}
export interface SignInSchema extends z.infer<typeof SIGN_IN_SCHEMA> {}
export interface AddParkingAreaSchema
  extends z.infer<typeof ADD_PARKING_SCHEMA> {}
export interface AddEVSchema extends z.infer<typeof ADD_EV_SCHEMA> {}

////////////////////////// DTO //////////////////////////////////
export interface State
  extends Omit<typeof states.$inferSelect, "createdAt" | "updatedAt"> {}
export interface City
  extends Omit<typeof cities.$inferSelect, "createdAt" | "updatedAt"> {}
export type Location = (typeof mockLocations)[number];

///////////////////////// Helper Types ///////////////////////////
export interface ServerActionSuccessResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ServerActionErrorResponse {
  success: boolean;
  error: string;
}

export type ServerActionResponse<T> =
  | ServerActionSuccessResponse<T>
  | ServerActionErrorResponse;
