import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const stateTable = pgTable("state", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  state_code: text("state_code").notNull(),
});
