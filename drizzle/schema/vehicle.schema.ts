import { pgEnum } from "drizzle-orm/pg-core";

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
