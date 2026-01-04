import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  smallint,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { evChargingBookings, parkingBookings } from "./booking.schema";
import { evChargingLevelEnum, evConnectorTypeEnum } from "./enum";
import { users } from "./user.schema";

export const dayOfWeekEnum = pgEnum("day_of_week", [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]);

export const vehicleTypes = pgTable("vehicle_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  description: varchar("description", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const vehicleTypesRelations = relations(vehicleTypes, ({ many }) => ({
  parkingSlotVehicleTypes: many(parkingSlotVehicleTypes), // Link to join table
}));

export const parkingAreas = pgTable("parking_areas", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 512 }).notNull(),
  cityId: uuid("city_id")
    .notNull()
    .references(() => cities.id),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  totalSlots: integer("total_slots").notNull().default(0),
  description: varchar("description", { length: 1024 }),
  openingTime: varchar("opening_time", { length: 5 }).notNull(),
  closingTime: varchar("closing_time", { length: 5 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const evStations = pgTable("ev_stations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 512 }).notNull(),
  cityId: uuid("city_id")
    .notNull()
    .references(() => cities.id),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  description: varchar("description", { length: 1024 }),
  totalSlots: smallint("total_slots").notNull().default(1),
  openingTime: varchar("opening_time", { length: 5 }),
  closingTime: varchar("closing_time", { length: 5 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const amenities = pgTable("amenities", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  description: text("description").notNull(),
});

export const amenitiesRelations = relations(amenities, ({ many }) => ({
  parkingAreaAmenities: many(parkingAreaAmenities),
  evStationAmenities: many(evStationAmenities),
}));

export const parkingAreaAmenities = pgTable("parking_area_amenities", {
  parkingAreaId: uuid("parking_area_id")
    .notNull()
    .references(() => parkingAreas.id, { onDelete: "cascade" }),
  amenityId: uuid("amenity_id")
    .notNull()
    .references(() => amenities.id, { onDelete: "cascade" }),
});

export const parkingAreaAmenitiesRelations = relations(
  parkingAreaAmenities,
  ({ one }) => ({
    parkingArea: one(parkingAreas, {
      fields: [parkingAreaAmenities.parkingAreaId],
      references: [parkingAreas.id],
    }),
    amenity: one(amenities, {
      fields: [parkingAreaAmenities.amenityId],
      references: [amenities.id],
    }),
  })
);

export const evStationAmenities = pgTable("ev_station_amenities", {
  evStationId: uuid("ev_station_id")
    .notNull()
    .references(() => evStations.id, { onDelete: "cascade" }),
  amenityId: uuid("amenity_id")
    .notNull()
    .references(() => amenities.id, { onDelete: "cascade" }),
});

export const evStationAmenitiesRelations = relations(
  evStationAmenities,
  ({ one }) => ({
    evStation: one(evStations, {
      fields: [evStationAmenities.evStationId],
      references: [evStations.id],
    }),
    amenity: one(amenities, {
      fields: [evStationAmenities.amenityId],
      references: [amenities.id],
    }),
  })
);

export const parkingAreasRelations = relations(
  parkingAreas,
  ({ one, many }) => ({
    owner: one(users, {
      fields: [parkingAreas.userId],
      references: [users.id],
    }),
    city: one(cities, {
      fields: [parkingAreas.cityId],
      references: [cities.id],
    }),
    parkingSlots: many(parkingSlots),
    parkingBookings: many(parkingBookings),
    parkingAreaImages: many(parkingAreaImages),
    parkingAreaAmenities: many(parkingAreaAmenities),
    schedule: many(parkingAreaSchedules),
  })
);

export const evStationsRelations = relations(evStations, ({ one, many }) => ({
  owner: one(users, {
    fields: [evStations.userId],
    references: [users.id],
  }),
  city: one(cities, {
    fields: [evStations.cityId],
    references: [cities.id],
  }),
  evChargingSlots: many(evChargingSlots),
  evChargingBookings: many(evChargingBookings),
  evStationImages: many(evStationImages),
  evStationAmenities: many(evStationAmenities),
  schedule: many(evStationSchedules),
}));

export const parkingAreaImages = pgTable("parking_area_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  parkingAreaId: uuid("parking_area_id")
    .notNull()
    .references(() => parkingAreas.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const parkingAreaImagesRelations = relations(
  parkingAreaImages,
  ({ one }) => ({
    parkingArea: one(parkingAreas, {
      fields: [parkingAreaImages.parkingAreaId],
      references: [parkingAreas.id],
    }),
  })
);

export const evStationImages = pgTable("ev_station_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  evStationId: uuid("ev_station_id")
    .notNull()
    .references(() => evStations.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const evStationImagesRelations = relations(
  evStationImages,
  ({ one }) => ({
    evStation: one(evStations, {
      fields: [evStationImages.evStationId],
      references: [evStations.id],
    }),
  })
);

export const evChargingSlots = pgTable("ev_charging_slots", {
  id: uuid("id").defaultRandom().primaryKey(),
  evStationId: uuid("ev_station_id")
    .notNull()
    .references(() => evStations.id, { onDelete: "cascade" }),
  slotNumber: varchar("slot_number", { length: 20 }).notNull(),
  connectorType: evConnectorTypeEnum("connector_type").notNull(),
  chargingLevel: evChargingLevelEnum("charging_level").notNull(),
  maxPowerKw: decimal("max_power_kw", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const evChargingSlotsRelations = relations(
  evChargingSlots,
  ({ one, many }) => ({
    evStation: one(evStations, {
      fields: [evChargingSlots.evStationId],
      references: [evStations.id],
    }),
    evChargingBookings: many(evChargingBookings),
  })
);

export const parkingSlots = pgTable(
  "parking_slots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parkingAreaId: uuid("parking_area_id")
      .notNull()
      .references(() => parkingAreas.id, { onDelete: "cascade" }),
    slotNumber: varchar("slot_number", { length: 20 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("unq_parking_area_slot_number").on(
      table.parkingAreaId,
      table.slotNumber
    ),
  ]
);

export const parkingSlotsRelations = relations(
  parkingSlots,
  ({ one, many }) => ({
    parkingArea: one(parkingAreas, {
      fields: [parkingSlots.parkingAreaId],
      references: [parkingAreas.id],
    }),

    parkingBookings: many(parkingBookings),
    parkingSlotVehicleTypes: many(parkingSlotVehicleTypes),
  })
);

export const parkingSlotVehicleTypes = pgTable(
  "parking_slot_vehicle_types",
  {
    parkingSlotId: uuid("parking_slot_id")
      .notNull()
      .references(() => parkingSlots.id, { onDelete: "cascade" }),
    vehicleTypeId: uuid("vehicle_type_id") // NEW: References the vehicleTypes table
      .notNull()
      .references(() => vehicleTypes.id, { onDelete: "cascade" }),

    // NEW 2: Pricing for this specific slot-vehicle type combination
    pricePerHour: decimal("price_per_hour", {
      precision: 10,
      scale: 2,
    }).notNull(),
    pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).default(
      "0.00"
    ), // Default to 0 if not set
    pricePerWeek: decimal("price_per_week", {
      precision: 10,
      scale: 2,
    }).default("0.00"),
    pricePerMonth: decimal("price_per_month", {
      precision: 10,
      scale: 2,
    }).default("0.00"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.parkingSlotId, table.vehicleTypeId] }),
  ]
);

// NEW: parkingSlotVehicleTypesRelations
export const parkingSlotVehicleTypesRelations = relations(
  parkingSlotVehicleTypes,
  ({ one }) => ({
    parkingSlot: one(parkingSlots, {
      fields: [parkingSlotVehicleTypes.parkingSlotId],
      references: [parkingSlots.id],
    }),
    vehicleType: one(vehicleTypes, {
      fields: [parkingSlotVehicleTypes.vehicleTypeId],
      references: [vehicleTypes.id],
    }),
  })
);

export const states = pgTable("states", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  abbreviation: varchar("abbreviation", { length: 2 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const statesRelations = relations(states, ({ many }) => ({
  cities: many(cities),
}));

export const cities = pgTable("cities", {
  id: uuid("id").defaultRandom().primaryKey(),
  stateId: uuid("state_id")
    .notNull()
    .references(() => states.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const citiesRelations = relations(cities, ({ one, many }) => ({
  state: one(states, {
    fields: [cities.stateId],
    references: [states.id],
  }),
  parkingAreas: many(parkingAreas),
  evStations: many(evStations),
}));

export const parkingAreaSchedules = pgTable(
  "parking_area_schedules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parkingAreaId: uuid("parking_area_id")
      .notNull()
      .references(() => parkingAreas.id, { onDelete: "cascade" }),
    dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
    openingTime: time("opening_time"), // supports "HH:MM:SS" & "HH:MM" strings
    closingTime: time("closing_time"), // supports "HH:MM:SS" & "HH:MM" strings
    isClosed: boolean("is_closed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("unq_parking_area_day").on(
      table.parkingAreaId,
      table.dayOfWeek
    ),
  ]
);

export const parkingAreaSchedulesRelations = relations(
  parkingAreaSchedules,
  ({ one }) => ({
    parkingArea: one(parkingAreas, {
      fields: [parkingAreaSchedules.parkingAreaId],
      references: [parkingAreas.id],
    }),
  })
);

export const evStationSchedules = pgTable(
  "ev_station_schedules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    evStationId: uuid("ev_station_id")
      .notNull()
      .references(() => evStations.id, { onDelete: "cascade" }),
    dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
    openingTime: time("opening_time"), // supports "HH:MM:SS" & "HH:MM" strings
    closingTime: time("closing_time"), // supports "HH:MM:SS" & "HH:MM" strings
    isClosed: boolean("is_closed").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("unq_ev_station_day").on(table.evStationId, table.dayOfWeek),
  ]
);

export const evStationSchedulesRelations = relations(
  evStationSchedules,
  ({ one }) => ({
    evStation: one(evStations, {
      fields: [evStationSchedules.evStationId],
      references: [evStations.id],
    }),
  })
);
