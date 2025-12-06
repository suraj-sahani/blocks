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


