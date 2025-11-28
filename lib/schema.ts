import * as z from "zod";

export const ENV_SCHEMA = z.object({
  GOOGLE_CLIENT_ID: z.string().nonempty({ error: "GOOGLE_CLIENT_ID is required." }),
  GOOGLE_CLIENT_SECRET: z.string().nonempty({ error: "GOOGLE_CLIENT_SECRET is required." }),
  BETTER_AUTH_SECRET: z.string().nonempty({ error: "BETTER_AUTH_SECRET is required." }),
  BETTER_AUTH_URL: z.string().nonempty({ error: "BETTER_AUTH_URL is required" }),
  DATABASE_URL: z.string().nonempty("DATABASE_URL is required.")
})

export const SIGN_IN_SCHEMA = z.object({})
