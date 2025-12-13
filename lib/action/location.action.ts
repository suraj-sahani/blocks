"use server";

import { db } from "@/drizzle/db";
import { AddParkingAreaSchema } from "../types";
import { parkingAreaImages, parkingAreas } from "@/drizzle/schema";
import { imageKitAuthenticator } from "../imagekit";
import { upload } from "@imagekit/next";
import { DrizzleError, DrizzleQueryError } from "drizzle-orm";
import { errorHandler } from "../utils";

export const addParkingArea = async (data: AddParkingAreaSchema) => {
  try {
    const dataClone = structuredClone(data);
    const abortController = new AbortController();
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

    const { images } = dataClone;
    const uploadedImages = [];
    if (Array.isArray(images) && images.length > 0) {
      // Upload Images of ImageKit
      const { token, signature, expire, publicKey } =
        await imageKitAuthenticator();

      // Upload Images one at a time
      for (const image of images) {
        const uploadedImage = await upload({
          expire,
          token,
          signature,
          publicKey,
          file: image,
          fileName: image.name,
          folder: "/Blocks/Parking Areas",
          abortSignal: abortController.signal,
        });

        // Once image is uploaded, insert into database
        const imageRes = await db
          .insert(parkingAreaImages)
          .values({
            parkingAreaId: res[0].id,
            url: uploadedImage.url || "",
          })
          .returning();

        uploadedImages.push(...imageRes);
      }
    }

    return {
      success: true,
      message: "Parking area added successfully.",
      data: { ...res[0], parking_area_images: uploadedImages },
    };
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to add parking area.");
    return {
      success: false,
      message: errMsg,
    };
  }
};
