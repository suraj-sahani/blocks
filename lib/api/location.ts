import { db } from "@/drizzle/db"
import { cities, states } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getAllStates = async () => {
  try {
    const res = await db.select({
      id: states.id,
      name: states.name,
      abbreviation: states.abbreviation
    }).from(states)
    return res
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch states.")
  }
}

export const getCitiesForState = async (stateId: string) => {
  try {
    const res = await db.select({
      id: cities.id,
      name: cities.name
    }).from(cities).where(eq(states.id, stateId))
    return res
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to fetch states.")
  }
}
