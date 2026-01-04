import { relations } from "drizzle-orm";
import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  evStationSlots,
  evStations,
  parkingAreas,
  parkingAreaSlots,
} from "./location.schema";
import { payments, paymentStatusEnum } from "./payment.schema";
import { users, userVehicles } from "./user.schema";
import { evConnectorTypeEnum, vehicleBodyTypeEnum } from "./enum";

export const parkingBookings = pgTable("parking_bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  userVehicleId: uuid("user_vehicle_id") // NEW: Which vehicle is being used for this booking
    .notNull()
    .references(() => userVehicles.id, { onDelete: "cascade" }),
  parkingAreaId: uuid("parking_area_id") // NEW: Direct link to parking area
    .notNull()
    .references(() => parkingAreas.id, { onDelete: "cascade" }),
  parkingSlotId: uuid("parking_slot_id")
    .notNull()
    .references(() => parkingAreaSlots.id, { onDelete: "cascade" }),
  vehicleBodyType: vehicleBodyTypeEnum("vehicle_body_type").notNull(), // UPDATED
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  actualCheckIn: timestamp("actual_check_in"),
  actualCheckOut: timestamp("actual_check_out"),
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }), // Calculated based on pricePerHour and duration
  status: varchar("status", { length: 50 }).notNull().default("confirmed"), // Booking status (e.g., 'pending', 'confirmed', 'completed', 'cancelled')
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const evChargingBookings = pgTable("ev_charging_bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  userVehicleId: uuid("user_vehicle_id") // NEW: Which vehicle is being charged
    .notNull()
    .references(() => userVehicles.id, { onDelete: "cascade" }),
  evStationId: uuid("ev_station_id")
    .notNull()
    .references(() => evStations.id, { onDelete: "cascade" }),
  evChargingSlotId: uuid("ev_charging_slot_id")
    .notNull()
    .references(() => evStationSlots.id, { onDelete: "cascade" }),
  connectorTypeUsed: evConnectorTypeEnum("connector_type_used").notNull(), // Which connector type the user booked/used
  startTime: timestamp("start_time").notNull(), // Planned start of charging
  endTime: timestamp("end_time"), // Planned end, could be null if "charge until full"
  actualStartTime: timestamp("actual_start_time"), // When charging actually started
  actualEndTime: timestamp("actual_end_time"), // When charging actually ended
  energyConsumedKwh: decimal("energy_consumed_kwh", {
    precision: 10,
    scale: 3,
  }), // How much energy was consumed
  totalCost: decimal("total_cost", { precision: 10, scale: 2 }), // Calculated based on pricePerKwh and energyConsumedKwh
  status: varchar("status", { length: 50 }).notNull().default("confirmed"), // Booking status
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const parkingBookingsRelations = relations(
  parkingBookings,
  ({ one }) => ({
    user: one(users, {
      fields: [parkingBookings.userId],
      references: [users.id],
    }),
    userVehicle: one(userVehicles, {
      // NEW RELATION
      fields: [parkingBookings.userVehicleId],
      references: [userVehicles.id],
    }),
    parkingArea: one(parkingAreas, {
      // NEW RELATION
      fields: [parkingBookings.parkingAreaId],
      references: [parkingAreas.id],
    }),
    parkingSlot: one(parkingAreaSlots, {
      fields: [parkingBookings.parkingSlotId],
      references: [parkingAreaSlots.id],
    }),
    payment: one(payments),
  })
);

export const evChargingBookingsRelations = relations(
  evChargingBookings,
  ({ one }) => ({
    user: one(users, {
      fields: [evChargingBookings.userId],
      references: [users.id],
    }),
    userVehicle: one(userVehicles, {
      // NEW RELATION
      fields: [evChargingBookings.userVehicleId],
      references: [userVehicles.id],
    }),
    evStation: one(evStations, {
      // NEW RELATION
      fields: [evChargingBookings.evStationId],
      references: [evStations.id],
    }),
    evChargingSlot: one(evStationSlots, {
      fields: [evChargingBookings.evChargingSlotId],
      references: [evStationSlots.id],
    }),
    payment: one(payments),
  })
);
