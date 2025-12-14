"use server";

import { db } from "@/drizzle/db";
import {
  evStationImages,
  evStations,
  parkingAreaImages,
  parkingAreas,
} from "@/drizzle/schema";
import { imageKitAuthenticator } from "../imagekit";
import { AddEVSchema, AddParkingAreaSchema } from "../types";
import { errorHandler } from "../utils";
import { upload, UploadResponse } from "@imagekit/next";

export const addParkingArea = async (data: AddParkingAreaSchema) => {
  try {
    const dataClone = structuredClone(data);

    const {
      address,
      city,
      description,
      name,
      zipcode,
      closingTime,
      openingTime,
      latitude,
      longitude,
      totalSlots,
      images,
    } = dataClone;

    const formattedData = {
      address: address,
      cityId: city,
      description: description,
      name: name,
      userId: "7472cba2-6037-488f-b5aa-53b1c39fe450",
      zipCode: zipcode || "",
      closingTime: new Date(closingTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      openingTime: new Date(openingTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      totalSlots: totalSlots,
    };

    const res = await db.insert(parkingAreas).values(formattedData).returning();

    return {
      success: true,
      message: "Parking area added successfully.",
      data: { ...res[0] },
    };
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to add parking area.");
    return {
      success: false,
      message: errMsg,
    };
  }
};

export const addParkingAreaImages = async (
  images: string,
  parkingAreaId: string
) => {
  try {
    const uploadedImages = [],
      parsedImages: UploadResponse[] = JSON.parse(images);
    for (const image of parsedImages) {
      const res = await db
        .insert(parkingAreaImages)
        .values({
          parkingAreaId,
          url: image.url || "",
        })
        .returning();

      uploadedImages.push(res[0]);
    }

    return {
      success: true,
      message: "Images added successfully.",
      data: uploadedImages,
    };
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to add parking area images.");
    return {
      success: false,
      message: errMsg,
    };
  }
};

export const addEVStation = async (data: AddEVSchema) => {
  try {
    const dataClone = structuredClone(data);

    const {
      address,
      city,
      description,
      name,
      zipcode,
      closingTime,
      openingTime,
      latitude,
      longitude,
      totalConnectors,
      images,
    } = dataClone;

    const formattedData = {
      address: address,
      cityId: city,
      description: description,
      name: name,
      userId: "7472cba2-6037-488f-b5aa-53b1c39fe450",
      zipCode: zipcode || "",
      closingTime: new Date(closingTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      openingTime: new Date(openingTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      totalConnectors,
    };

    const res = await db.insert(evStations).values(formattedData).returning();

    return {
      success: true,
      message: "Parking area added successfully.",
      data: { ...res[0] },
    };
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to add parking area.");
    return {
      success: false,
      message: errMsg,
    };
  }
};

export const addEVStationImages = async (
  images: string,
  evStationId: string
) => {
  try {
    const uploadedImages = [],
      parsedImages: UploadResponse[] = JSON.parse(images);
    for (const image of parsedImages) {
      const res = await db
        .insert(evStationImages)
        .values({
          evStationId,
          url: image.url || "",
        })
        .returning();

      uploadedImages.push(res[0]);
    }

    return {
      success: true,
      message: "Images added successfully.",
      data: uploadedImages,
    };
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to add parking area images.");
    return {
      success: false,
      message: errMsg,
    };
  }
};
