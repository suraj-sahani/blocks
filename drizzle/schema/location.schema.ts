import { relations } from "drizzle-orm";
import { boolean, decimal, integer, pgEnum, pgTable, primaryKey, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { evChargingBookings, parkingBookings } from "./booking.schema";
import { users } from "./user.schema";
import { evChargingLevelEnum, evConnectorTypeEnum, parkingSlotTypeEnum, vehicleBodyTypeEnum } from "./enum"

export const parkingAreas = pgTable("parking_areas", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 512 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  state: varchar("state", { length: 256 }).notNull(),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  totalSlots: integer("total_slots").notNull().default(0),
  description: varchar("description", { length: 1024 }),
  openingTime: varchar("opening_time", { length: 5 }).notNull(),
  closingTime: varchar("closing_time", { length: 5 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const evStations = pgTable("ev_stations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(), // Name of the EV charging station
  address: varchar("address", { length: 512 }).notNull(), // Full address
  city: varchar("city", { length: 256 }).notNull(),
  state: varchar("state", { length: 256 }).notNull(),
  zipCode: varchar("zip_code", { length: 10 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  description: varchar("description", { length: 1024 }),
  connectorType: evConnectorTypeEnum("connector_type").notNull(),
  chargingLevel: evChargingLevelEnum("charging_level").notNull(),
  maxPowerKw: decimal("max_power_kw", { precision: 5, scale: 2 }).notNull(),
  pricePerKwh: decimal("price_per_kwh", { precision: 10, scale: 3 }).notNull(), // NEW: Price per kilowatt-hour
  totalConnectors: smallint("total_connectors").notNull().default(1), // How many physical charging points at this station
  availableConnectors: smallint("available_connectors").notNull().default(0), // Real-time availability (can be managed via application logic or triggers)
  openingTime: varchar("opening_time", { length: 5 }), // Optional operating hours
  closingTime: varchar("closing_time", { length: 5 }), // Optional operating hours
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

export const parkingAreasRelations = relations(parkingAreas, ({ one, many }) => ({
  owner: one(users, {
    fields: [parkingAreas.userId],
    references: [users.id],
  }),
  parkingSlots: many(parkingSlots),
  parkingBookings: many(parkingBookings), // Add this relation if needed to see all bookings for an area
  parkingAreaImages: many(parkingAreaImages), // NEW RELATION to parking_area_images
  parkingAreaAmenities: many(parkingAreaAmenities)
}));

export const evStationsRelations = relations(evStations, ({ one, many }) => ({
  owner: one(users, {
    fields: [evStations.userId],
    references: [users.id],
  }),
  evChargingSlots: many(evChargingSlots),
  evChargingBookings: many(evChargingBookings), // Add this relation to directly get bookings for a station
  evStationImages: many(evStationImages), // NEW RELATION to ev_station_images
  evStationAmenities: many(evStationAmenities)
}));

export const parkingAreaImages = pgTable("parking_area_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  parkingAreaId: uuid("parking_area_id")
    .notNull()
    .references(() => parkingAreas.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

export const parkingSlots = pgTable("parking_slots", {
  id: uuid("id").defaultRandom().primaryKey(),
  parkingAreaId: uuid("parking_area_id")
    .notNull()
    .references(() => parkingAreas.id, { onDelete: "cascade" }),
  slotNumber: varchar("slot_number", { length: 20 }).notNull(),
  floor: varchar("floor", { length: 10 }),
  type: parkingSlotTypeEnum("type").notNull().default("standard"),
  // Removed isAvailable column
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const parkingSlotsRelations = relations(parkingSlots, ({ one, many }) => ({
  parkingArea: one(parkingAreas, {
    fields: [parkingSlots.parkingAreaId],
    references: [parkingAreas.id],
  }),
  prices: many(parkingSlotPrices),
  parkingBookings: many(parkingBookings),
}));

export const parkingSlotPrices = pgTable("parking_slot_prices", {
  id: uuid("id").defaultRandom().primaryKey(),
  parkingSlotId: uuid("parking_slot_id")
    .notNull()
    .references(() => parkingSlots.id, { onDelete: "cascade" }),
  vehicleBodyType: vehicleBodyTypeEnum("vehicle_body_type").notNull(),
  pricePerHour: decimal("price_per_hour", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const parkingSlotPricesRelations = relations(
  parkingSlotPrices,
  ({ one }) => ({
    parkingSlot: one(parkingSlots, {
      fields: [parkingSlotPrices.parkingSlotId],
      references: [parkingSlots.id],
    }),
  })
);
