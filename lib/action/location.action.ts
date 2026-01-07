"use server";

import { db } from "@/drizzle/db";
import {
  evStationAmenities,
  evStationImages,
  evStations,
  evStationSchedules,
  evStationSlots,
  parkingAreaAmenities,
  parkingAreaImages,
  parkingAreas,
  parkingAreaSchedules,
  parkingAreaSlots,
  parkingSlotVehicleTypes,
} from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";
import { auth } from "../auth/server";
import { uploadImagesToImageKit } from "../imagekit";
import { logger } from "../pino/server";
import { AddEVSchema, AddParkingAreaSchema } from "../types";
import { errorHandler } from "../utils";
import { headers } from "next/headers";

type InsertParkingArea = typeof parkingAreas.$inferInsert;
type InsertEVStation = typeof evStations.$inferInsert;
type InsertParkingSlotForVehicleType =
  typeof parkingSlotVehicleTypes.$inferInsert;

export const addParkingArea = async (data: AddParkingAreaSchema) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const response = await db.transaction(async (tx) => {
      const dataClone = structuredClone(data);

      const {
        address,
        city,
        description,
        name,
        zipcode,
        latitude,
        longitude,
        totalSlots,
        images,
        schedule,
        slots,
        state,
        amenities,
      } = dataClone;

      const formattedData: InsertParkingArea = {
        address: address,
        cityId: city,
        description: description,
        name: name,
        userId: session.user.id,
        zipCode: zipcode || "",
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        totalSlots: totalSlots,
      };

      // Check for existing parking area matching the
      // inserted latitude and longitude
      const existingParkingArea = await tx
        .select()
        .from(parkingAreas)
        .where(
          or(
            eq(evStations.address, address),
            eq(evStations.latitude, latitude.toString()),
            eq(evStations.longitude, longitude.toString())
          )
        );

      if (existingParkingArea.length > 0) {
        throw new Error("Parking area already exists.");
      }

      // Insert the new parking area
      const res = await tx
        .insert(parkingAreas)
        .values(formattedData)
        .returning();

      // Add amenities for parking area
      if (Array.isArray(amenities) && amenities.length > 0) {
        for (const amenity of amenities) {
          await tx.insert(parkingAreaAmenities).values({
            parkingAreaId: res[0].id,
            amenityId: amenity,
          });
        }
      }

      // Add schedule for parking area
      if (Array.isArray(schedule) && schedule.length > 0) {
        for (const scheduleItem of schedule) {
          const { closingTime, openingTime, isClosed, dayOfWeek } =
            scheduleItem;
          await tx.insert(parkingAreaSchedules).values({
            parkingAreaId: res[0].id,
            dayOfWeek,
            isClosed,
            openingTime: openingTime.toISOString(),
            closingTime: closingTime.toISOString(),
          });
        }
      }

      if (Array.isArray(slots) && slots.length > 0) {
        // Generate Slot Number
        for (const slot of slots) {
          const {
            pricePerDay,
            pricePerHour,
            pricePerMonth,
            pricePerWeek,
            vehicleTypes,
          } = slot;
          const parkingAreaSlot = await tx
            .insert(parkingAreaSlots)
            .values({
              parkingAreaId: res[0].id,
              slotNumber: "ADD_GENERATED_SLOT_NUMBER",
            })
            .returning();

          if (!parkingAreaSlot[0].id) {
            throw new Error("Failed to generate slot");
          }

          const parkingSlotVehicleTypeInsert: InsertParkingSlotForVehicleType[] =
            [];
          for (const vehicleType of vehicleTypes) {
            parkingSlotVehicleTypeInsert.push({
              parkingSlotId: parkingAreaSlot[0].id,
              vehicleTypeId: vehicleType,
              pricePerHour: pricePerHour.toString(),
              pricePerDay: pricePerDay.toString(),
              pricePerMonth: pricePerMonth.toString(),
              pricePerWeek: pricePerWeek.toString(),
            });
          }

          await tx
            .insert(parkingSlotVehicleTypes)
            .values(parkingSlotVehicleTypeInsert);
        }
      }

      // Upload parking area images
      if (Array.isArray(images) && images.length > 0) {
        const imageKitRes = await uploadImagesToImageKit(
          images,
          "parking-areas"
        );

        if (!imageKitRes.success) {
          throw new Error(imageKitRes.message);
        }

        const uploadedImages = imageKitRes.data;

        for (const image of uploadedImages) {
          await tx.insert(parkingAreaImages).values({
            parkingAreaId: res[0].id,
            url: image.url || "",
          });
        }
      }

      return { data: res[0] };
    });

    return {
      success: true,
      message: "Parking area added successfully.",
      data: response.data,
    };
  } catch (error) {
    logger.error(error);
    const errMsg = errorHandler(error, "Failed to add parking area.");
    return {
      success: false,
      message: errMsg,
    };
  }
};

export const addEVStation = async (data: AddEVSchema) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user.id) {
      throw new Error("Unauthorized");
    }

    const response = await db.transaction(async (tx) => {
      const dataClone = structuredClone(data);

      const {
        address,
        city,
        description,
        name,
        zipcode,
        latitude,
        longitude,
        totalSlots,
        images,
        schedule,
        slots,
        amenities,
      } = dataClone;

      const formattedData: InsertEVStation = {
        address: address,
        cityId: city,
        description: description,
        name: name,
        userId: session.user.id,
        zipCode: zipcode || "",
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        totalSlots,
      };

      const existingEVStation = await tx
        .select()
        .from(evStations)
        .where(
          or(
            eq(evStations.address, address),
            eq(evStations.latitude, latitude.toString()),
            eq(evStations.longitude, longitude.toString())
          )
        );

      if (existingEVStation.length > 0) {
        throw new Error("EV Station already exists.");
      }

      const res = await db.insert(evStations).values(formattedData).returning();

      // Add ev station amenities
      if (Array.isArray(amenities) && amenities.length > 0) {
        for (const amenity of amenities) {
          await tx.insert(evStationAmenities).values({
            evStationId: res[0].id,
            amenityId: amenity,
          });
        }
      }

      // Add schedule for ev station
      if (Array.isArray(schedule) && schedule.length > 0) {
        for (const scheduleItem of schedule) {
          const { closingTime, openingTime, isClosed, dayOfWeek } =
            scheduleItem;
          await tx.insert(evStationSchedules).values({
            evStationId: res[0].id,
            dayOfWeek,
            isClosed,
            openingTime: openingTime.toISOString(),
            closingTime: closingTime.toISOString(),
          });
        }
      }

      if (Array.isArray(slots) && slots.length > 0) {
        // Generate Slot Number
        for (const slot of slots) {
          const { chargingLevel, connectorType, maxPower, pricePerKwh } = slot;
          await tx.insert(evStationSlots).values({
            evStationId: res[0].id,
            slotNumber: "ADD_GENERATED_SLOT_NUMBER",
            chargingLevel,
            connectorType,
            maxPowerKw: maxPower.toString(),
            pricePerKwh: pricePerKwh.toString(),
          });
        }
      }

      // Upload parking area images
      if (Array.isArray(images) && images.length > 0) {
        const imageKitRes = await uploadImagesToImageKit(
          images,
          "parking-areas"
        );

        if (!imageKitRes.success) {
          throw new Error(imageKitRes.message);
        }

        const uploadedImages = imageKitRes.data;

        for (const image of uploadedImages) {
          await tx.insert(evStationImages).values({
            evStationId: res[0].id,
            url: image.url || "",
          });
        }
      }

      return { data: res[0] };
    });

    return {
      success: true,
      message: "Parking area added successfully.",
      data: response.data,
    };
  } catch (error) {
    logger.error(error);
    const errMsg = errorHandler(error, "Failed to add parking area.");
    return {
      success: false,
      message: errMsg,
    };
  }
};
