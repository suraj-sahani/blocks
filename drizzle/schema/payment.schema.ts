import { decimal, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { evChargingBookings, parkingBookings } from "./booking.schema";
import { relations } from "drizzle-orm";

export const paymentStatusEnum = pgEnum("payment_status", [
  "requires_payment_method",
  "requires_confirmation",
  "requires_action",
  "processing",
  "succeeded",
  "canceled",
  "failed", // Custom status for app-level failure
]);

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id") // The user making the payment (the renter)
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  paymentIntentId: varchar("payment_intent_id", { length: 256 }).unique().notNull(),
  status: paymentStatusEnum("status").notNull().default("requires_payment_method"),
  paymentMethodType: varchar("payment_method_type", { length: 50 }),
  receiptUrl: varchar("receipt_url", { length: 512 }),

  parkingBookingId: uuid("parking_booking_id").references(() => parkingBookings.id, {
    onDelete: "cascade",
  }),
  evChargingBookingId: uuid("ev_charging_booking_id").references(() => evChargingBookings.id, {
    onDelete: "cascade",
  }),

  paymentDate: timestamp("payment_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// NEW: Payments Relations
export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  parkingBooking: one(parkingBookings, {
    fields: [payments.parkingBookingId],
    references: [parkingBookings.id],
  }),
  evChargingBooking: one(evChargingBookings, {
    fields: [payments.evChargingBookingId],
    references: [evChargingBookings.id],
  }),
}));
