import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { iconMappings } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAmenityIcon = (name: string) => {
  return iconMappings.find(
    (mapping) => mapping.name.toLowerCase() === name.toLowerCase()
  );
};
