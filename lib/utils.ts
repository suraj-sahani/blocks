import { clsx, type ClassValue } from "clsx";
import { DrizzleQueryError } from "drizzle-orm";
import { twMerge } from "tailwind-merge";
import z, { ZodError } from "zod";
import { iconMappings } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pad = (n: number) => String(n).padStart(2, "0");
export const formatTime = (d?: Date) => {
  const date = d ?? new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

export const parseTime = (timeStr: string) => {
  const parts = timeStr.split(":").map((p) => Number(p));
  const now = new Date();
  const h = parts[0] ?? 0;
  const m = parts[1] ?? 0;
  const s = parts[2] ?? 0;
  now.setHours(h, m, s, 0);
  return now;
};

export const getAmenityIcon = (name: string) => {
  return iconMappings.find(
    (mapping) => mapping.name.toLowerCase() === name.toLowerCase()
  );
};

export const errorHandler = (error: unknown, message?: string) => {
  if (error instanceof DrizzleQueryError) {
    console.dir({ type: "Drizzle Query Error", error }, { depth: null });
    return error.cause?.message || error.message;
  } else if (error instanceof ZodError) {
    console.dir({ type: "Zod Error", error }, { depth: null });
    return z.prettifyError(error);
  } else if (error instanceof Error) {
    console.dir({ type: "Error", error }, { depth: null });
    return error.message;
  } else {
    console.dir({ type: "Unknown Error", error }, { depth: null });
    return message || "Something went wrong!";
  }
};
