import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { evStations, parkingAreas } from "./location.schema";
import { relations } from "drizzle-orm";
import { evChargingBookings, parkingBookings } from "./booking.schema";
import { payments } from "./payment.schema";
import { evConnectorTypeEnum, vehicleBodyTypeEnum } from "./enum";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }), // For email/password logins
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  profilePictureUrl: varchar("profile_picture_url", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userVehicles: many(userVehicles),
  parkingBookings: many(parkingBookings),
  evChargingBookings: many(evChargingBookings),
  parkingAreas: many(parkingAreas),
  evStations: many(evStations),
  userImages: many(userImages),
  payments: many(payments),
}));

export const userImages = pgTable("user_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userImagesRelations = relations(userImages, ({ one }) => ({
  user: one(users, {
    fields: [userImages.userId],
    references: [users.id],
  }),
}));

export const userVehicles = pgTable("user_vehicles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  make: varchar("make", { length: 256 }).notNull(),
  model: varchar("model", { length: 256 }).notNull(),
  year: integer("year"), // e.g., 2023
  licensePlate: varchar("license_plate", { length: 20 }).unique().notNull(), // Unique per vehicle
  vin: varchar("vin", { length: 17 }).unique(), // VIN (Vehicle Identification Number), optional but good for identification
  color: varchar("color", { length: 50 }),
  bodyType: vehicleBodyTypeEnum("body_type").notNull(), // e.g., "sedan", "suv"
  // If electric, what's its primary connector type?
  evPrimaryConnector: evConnectorTypeEnum("ev_primary_connector"), // Null if not EV
  isDefault: boolean("is_default").default(false), // Mark one vehicle as default for quicker booking
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userVehicleImages = pgTable("user_vehicle_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  userVehicleId: uuid("user_vehicle_id")
    .notNull()
    .references(() => userVehicles.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userVehicleImagesRelations = relations(
  userVehicleImages,
  ({ one }) => ({
    userVehicle: one(userVehicles, {
      fields: [userVehicleImages.userVehicleId],
      references: [userVehicles.id],
    }),
  })
);

export const userVehiclesRelations = relations(
  userVehicles,
  ({ one, many }) => ({
    user: one(users, {
      fields: [userVehicles.userId],
      references: [users.id],
    }),
    parkingBookings: many(parkingBookings), // This vehicle can be used in parking bookings
  })
);
