import * as z from "zod";
import {
  ADD_EV_SCHEMA,
  ADD_PARKING_SCHEMA,
  ENV_SCHEMA,
  SIGN_IN_SCHEMA,
  SIGN_UP_SCHEMA,
} from "./schema";
import { amenities, cities, states } from "@/drizzle/schema";
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

export interface Amenities extends NonNullable<typeof amenities.$inferSelect> {}

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

//////////////////// Enums /////////////////////////
export enum EVConnectorTypes {
  Type1 = "type_1",
  Type2 = "type_2",
  ComboCcs1 = "combo_ccs_1",
  ComboCcs2 = "combo_ccs_2",
  Chademo = "chademo",
  Tesla = "tesla_supercharger",
  Other = "other",
  J1772 = "j1772",
  Nacs = "nacs",
}

export enum EVChargingLevels {
  Level1 = "level_1",
  Level2 = "level_2",
  DcFast = "dc_fast",
}
