import { z } from "zod/v4";

export const envSchema = z.object({
  PORT: z.coerce.number().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.string().min(1, "DATABASE URL is required"),
  IMAGEKIT_PRIVATE_KEY: z.string().min(1, "IMAGEKIT PRIVATE KEY is required"),
  IMAGEKIT_PUBLIC_KEY: z.string().min(1, "IMAGEKIT PUBLIC KEY is required"),
  SESSION_SECRET: z.string().min(1, "SESSION SECRET is required"),
  NEXT_PUBLIC_IAMGEKIT_URL_ENDPOINT: z
    .string()
    .min(1, "IMAGEKIT PUBLIC ENDPOINT is required"),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1, "MAPBOX Token is required"),
});

// You can use z.infer<typeof envSchema> directly instead of the Env interface.

export type Env = z.infer<typeof envSchema>;
