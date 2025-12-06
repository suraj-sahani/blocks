"use server"
import { db } from "@/drizzle/db";
import { cities, states } from "@/drizzle/schema";
import * as path from "node:path";
import * as fs from "node:fs/promises"

export async function seedCities() {
  console.log("Starting to seed cities...");

  const citiesCSVPath = path.join(process.cwd(), "lib", "seed", "uscities.csv");

  try {
    const allStates = await db.select().from(states)

    const stateIdMap = new Map<string, string>()

    for (const state of allStates) {
      stateIdMap.set(state.abbreviation, state.id)
    }

    if (stateIdMap.size === 0) {
      console.error("No states found in database")
      return
    }

    const citiesCSV = await fs.readFile(citiesCSVPath, "utf-8")
    const lines = citiesCSV.split('\n').slice(1)

    const cityInserts = []
    const batchSize = 1000

    for (const line of lines) {
      if (!line.trim()) continue

      const [cityName, abbreviation] = line.split(',')
      console.log({ cityName, abbreviation })

      const stateId = stateIdMap.get(abbreviation.trim())

      if (stateId) {
        cityInserts.push({
          stateId,
          name: cityName.trim(),
        })
      } else {
        console.warn(`State abbreviation '${abbreviation.trim()}' not found for city '${cityName.trim()}'`);
      }

      if (cityInserts.length >= batchSize) {
        console.log(`Inserting batch of ${cityInserts.length} cities...`);
        await db.insert(cities).values(cityInserts).onConflictDoNothing()
        cityInserts.length = 0

      }

    }


    if (cityInserts.length > 0) {
      console.log(`Inserting final batch of ${cityInserts.length} cities...`);
      await db.insert(cities).values(cityInserts).onConflictDoNothing();
    }

    console.log("Cities seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding cities:", error);
  }
  console.log(citiesCSVPath);
}
