import { pgEnum } from "drizzle-orm/pg-core";

// Enum for the type of parking slot (e.g., standard, accessible, compact, EV_reserved - meaning a slot specifically for EVs)
export const parkingSlotTypeEnum = pgEnum("parking_slot_type", [
  "standard",
  "accessible", // Handicap
  "compact", // Smaller car slots
  "ev_reserved", // A parking slot designated for EVs (without an integrated charger necessarily)
  "motorcycle",
]);

// Enum for EV connector types
export const evConnectorTypeEnum = pgEnum("ev_connector_type", [
  "type_1", // J1772 (North America)
  "type_2", // Mennekes (Europe)
  "combo_ccs_1", // CCS Type 1
  "combo_ccs_2", // CCS Type 2
  "chademo", // Japan
  "tesla_supercharger", // Tesla specific (often proprietary)
  "nacs",
  "j1772",
  "other",
]);

// Enum for EV charging power levels
export const evChargingLevelEnum = pgEnum("ev_charging_level", [
  "level_1", // Slowest AC charging (120V)
  "level_2", // Faster AC charging (208-240V)
  "dc_fast", // DC Fast Charging
]);

export const vehicleBodyTypeEnum = pgEnum("vehicle_body_type", [
  "sedan",
  "suv",
  "truck",
  "van",
  "hatchback",
  "coupe",
  "motorcycle",
  "other",
]);
