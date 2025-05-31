import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { stateTable } from "./state.schema";

export const cityTable = pgTable("city", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  state_id: uuid("state_id")
    .notNull()
    .references(() => stateTable.id),
});
