import { ENV } from "@/lib/types";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENV { }
  }
}
