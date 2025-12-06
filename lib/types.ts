import * as z from "zod";
import { ENV_SCHEMA } from "./schema";
import { cities, states } from "@/drizzle/schema";

export type ENV = z.infer<typeof ENV_SCHEMA>;

export interface State extends Omit<typeof states.$inferSelect, 'createdAt' | 'updatedAt'> { }
export interface City extends Omit<typeof cities.$inferSelect, 'createdAt' | 'updatedAt'> { }
