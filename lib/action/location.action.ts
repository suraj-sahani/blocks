"use server";

import { db } from "@/drizzle/db";
import { AddParkingAreaSchema } from "../types";
import { parkingAreaImages, parkingAreas } from "@/drizzle/schema";
import { imageKitAuthenticator } from "../imagekit";
import { upload } from "@imagekit/next";

export const addParkingArea = async (data: AddParkingAreaSchema) => {
  try {
    const dataClone = structuredClone(data);
    const abortController = new AbortController();

    const formattedData = {
      address: dataClone.address,
      cityId: dataClone.city,
      description: dataClone.description,
      name: dataClone.name,
      userId: "",
      zipCode: dataClone.zipcode || "",
      closingTime: dataClone.closingTime.toISOString(),
      openingTime: dataClone.openingTime.toISOString(),
      latitude: dataClone.latitude.toString(),
      longitude: dataClone.longitude.toString(),
      totalSlots: dataClone.totalSlots,
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
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add parking area.",
    };
  }
};
