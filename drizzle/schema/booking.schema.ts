import {
  doublePrecision,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema";
import { parkingAreaSlotTable, parkingAreaTable } from "./parking-area.schema";

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending", // Waiting for approaval from host
  "approved", // Approved by the host
  "rejected", // Rejected by the host
  "cancelled", // Booking was cancelled by the user
  "completed", // Booking was completed
]);
export const paymentMethod = pgEnum("payment_method", ["card", "cash"]);
export const paymentStatus = pgEnum("payment_status", [
  "pending", // Initial or "requires_payment_method"
  "requires_action", // Stripe needs customer interaction
  "processing", // In progress
  "authorized", // (if using manual capture)
  "failed", // Failed payment
  "canceled", // Canceled payment
  "succeeded", // Payment succeeded
]);

export const bookingTable = pgTable("booking", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  slot_id: uuid("slot_id")
    .notNull()
    .references(() => parkingAreaSlotTable.id),
  user_id: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  parking_area_id: uuid("parking_area_id")
    .notNull()
    .references(() => parkingAreaTable.id),
  booking_status: bookingStatusEnum().default("pending"),
  payment_status: paymentStatus().default("pending"),
  start_time: timestamp({ withTimezone: true }).notNull(),
  end_time: timestamp({ withTimezone: true }).notNull(),
});

export const paymentTable = pgTable("payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  booking_id: uuid("booking_id")
    .notNull()
    .references(() => bookingTable.id),
  amount: doublePrecision("amount").notNull(),
  payment_method: paymentMethod().notNull(),
  payment_status: paymentStatus().default("pending"),
});
