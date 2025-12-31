"use server";
import { db } from "@/drizzle/db";
import { cities, states } from "@/drizzle/schema";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import { logger } from "../pino/server";
import { sql } from "drizzle-orm";

export async function seedStates() {
  logger.info("Seeding states...");

  try {
    await db.execute(sql`
      INSERT INTO "states" ("name", "abbreviation") VALUES
      ('Alabama', 'AL'),
      ('Alaska', 'AK'),
      ('Arizona', 'AZ'),
      ('Arkansas', 'AR'),
      ('California', 'CA'),
      ('Colorado', 'CO'),
      ('Connecticut', 'CT'),
      ('Delaware', 'DE'),
      ('District of Columbia', 'DC'),
      ('Florida', 'FL'),
      ('Georgia', 'GA'),
      ('Hawaii', 'HI'),
      ('Idaho', 'ID'),
      ('Illinois', 'IL'),
      ('Indiana', 'IN'),
      ('Iowa', 'IA'),
      ('Kansas', 'KS'),
      ('Kentucky', 'KY'),
      ('Louisiana', 'LA'),
      ('Maine', 'ME'),
      ('Maryland', 'MD'),
      ('Massachusetts', 'MA'),
      ('Michigan', 'MI'),
      ('Minnesota', 'MN'),
      ('Mississippi', 'MS'),
      ('Missouri', 'MO'),
      ('Montana', 'MT'),
      ('Nebraska', 'NE'),
      ('Nevada', 'NV'),
      ('New Hampshire', 'NH'),
      ('New Jersey', 'NJ'),
      ('New Mexico', 'NM'),
      ('New York', 'NY'),
      ('North Carolina', 'NC'),
      ('North Dakota', 'ND'),
      ('Ohio', 'OH'),
      ('Oklahoma', 'OK'),
      ('Oregon', 'OR'),
      ('Pennsylvania', 'PA'),
      ('Rhode Island', 'RI'),
      ('South Carolina', 'SC'),
      ('South Dakota', 'SD'),
      ('Tennessee', 'TN'),
      ('Texas', 'TX'),
      ('Utah', 'UT'),
      ('Vermont', 'VT'),
      ('Virginia', 'VA'),
      ('Washington', 'WA'),
      ('West Virginia', 'WV'),
      ('Wisconsin', 'WI'),
      ('Wyoming', 'WY')
      ON CONFLICT ("abbreviation") DO NOTHING;
    `);

    logger.info("States seeded successfully!");

    return {
      success: true,
      message: "States seeded successfully!",
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      message: "Error seeding states",
    };
  }
}

export async function seedCities() {
  logger.info("Starting to seed cities...");

  const citiesCSVPath = path.join(process.cwd(), "lib", "seed", "uscities.csv");

  try {
    const allStates = await db.select().from(states);

    const stateIdMap = new Map<string, string>();

    for (const state of allStates) {
      stateIdMap.set(state.abbreviation, state.id);
    }

    if (stateIdMap.size === 0) {
      logger.error("No states found in database");
      return {
        success: false,
        message: "No states found in database",
      };
    }

    const citiesCSV = await fs.readFile(citiesCSVPath, "utf-8");
    const lines = citiesCSV.split("\n").slice(1);

    const cityInserts = [];
    const batchSize = 1000;

    for (const line of lines) {
      if (!line.trim()) continue;

      const [cityName, abbreviation] = line.split(",");
      logger.info({ cityName, abbreviation });

      const stateId = stateIdMap.get(abbreviation.trim());

      if (stateId) {
        cityInserts.push({
          stateId,
          name: cityName.trim(),
        });
      } else {
        logger.warn(
          `State abbreviation '${abbreviation.trim()}' not found for city '${cityName.trim()}'`
        );
      }

      if (cityInserts.length >= batchSize) {
        logger.info(`Inserting batch of ${cityInserts.length} cities...`);
        await db.insert(cities).values(cityInserts).onConflictDoNothing();
        cityInserts.length = 0;
      }
    }

    if (cityInserts.length > 0) {
      logger.info(`Inserting final batch of ${cityInserts.length} cities...`);
      await db.insert(cities).values(cityInserts).onConflictDoNothing();
    }

    logger.info("Cities seeding completed successfully!");
    return {
      success: true,
      message: "Cities seeding completed successfully!",
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      message: "Failed to seed cities",
    };
  }
}

export async function seedLocations() {
  const states = await seedStates();

  if (!states.success) {
    return {
      success: false,
      message: "Failed to seed states",
    };
  }
  const cities = await seedCities();

  if (!cities.success) {
    return {
      success: false,
      message: "Failed to seed cities",
    };
  }
  return {
    success: true,
    message: "States and cities seeded successfully!",
  };
}
