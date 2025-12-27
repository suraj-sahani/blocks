import { db } from "@/drizzle/db";
import { account, session, users, verification } from "@/drizzle/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      account,
      session,
      verification,
    },
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
});
