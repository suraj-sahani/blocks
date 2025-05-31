import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { stateTable } from "./state.schema";
import { cityTable } from "./city.schema";
import { usersTable } from "./user.schema";

export const parkingAreaTable = pgTable("parking_area", {
  id: uuid("id").primaryKey().defaultRandom(),
  address_line_1: text("address_line_1").notNull(),
  address_line_2: text("address_line_2"),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  description: text("description"),
  name: text("name").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  total_slots: integer("total_slots").notNull(),
  state_id: uuid("state_id")
    .notNull()
    .references(() => stateTable.id),
  city_id: uuid("city_id")
    .notNull()
    .references(() => cityTable.id),
  host_id: uuid("host_id")
    .notNull()
    .references(() => usersTable.id),
});

export const parkingAreaSlotTable = pgTable("parking_area_slot", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  parking_area_id: uuid("parking_area_id")
    .notNull()
    .references(() => parkingAreaTable.id),
});

export const amenitiesTable = pgTable("amenities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  description: text("description").notNull(),
});

// Many to many relationship to get parking area amenities
export const parkingAreaAmenities = pgTable("parking_area_amenities", {
  parking_area_id: uuid("parking_area_id").references(
    () => parkingAreaTable.id
  ),
  amenities_id: uuid("amenities_id").references(() => amenitiesTable.id),
});

export const parkingAreaImages = pgTable("parking_area_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  image_url: text("image_url").notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  parking_area_id: uuid("parking_area_id")
    .notNull()
    .references(() => parkingAreaTable.id),
});
