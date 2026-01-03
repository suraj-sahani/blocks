import { db } from "@/drizzle/db";
import { amenities, states } from "@/drizzle/schema";
import { errorHandler } from "../utils";

export const getAllStates = async () => {
  try {
    const res = await db
      .select({
        id: states.id,
        name: states.name,
        abbreviation: states.abbreviation,
      })
      .from(states);
    return res;
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to fetch states.");
    throw new Error(errMsg);
  }
};

export const getAllAmenities = async () => {
  try {
    const res = await db.select().from(amenities);
    return res;
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to fetch states.");
    throw new Error(errMsg);
  }
};
