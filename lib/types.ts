import * as z from "zod";
import { ENV_SCHEMA } from "./schema";

export type ENV = z.infer<typeof ENV_SCHEMA>;
