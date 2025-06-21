import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { cityTable } from "./city.schema";
import { stateTable } from "./state.schema";
import { usersTable } from "./user.schema";

export const evChargingTable = pgTable("ev_charging", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  description: text("description"),
  name: text("name").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  address_line_1: text("address_line_1").notNull(),
  address_line_2: text("address_line_2"),
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
  charging_station_power: text("charging_station_power").notNull(),
  charging_station_price: text("charging_station_price").notNull(),
});

export const evChargingSlotTable = pgTable("ev_charging_slot", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  ev_charging_id: uuid("ev_charging_id")
    .notNull()
    .references(() => evChargingTable.id),
});

export const connectorTable = pgTable("connectors", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  description: text("description").notNull(),
  image_url: text("image_url").notNull(),
});

export const evChargingToConnectorsTable = pgTable(
  "ev_charging_to_connectors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ev_charging_id: uuid("ev_charging_id")
      .notNull()
      .references(() => evChargingTable.id),
    connector_id: uuid("connector_id")
      .notNull()
      .references(() => connectorTable.id),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  }
);

export const evChargingImagesTable = pgTable("ev_charging_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  ev_charging_id: uuid("ev_charging_id")
    .notNull()
    .references(() => evChargingTable.id),
  image_url: text("image_url").notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
