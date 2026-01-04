import { upload, UploadResponse } from "@imagekit/next";
import { AuthResponse } from "@imagekit/next/server";
import { errorHandler } from "./utils";

export interface ImageKitAuthenticator extends AuthResponse {
  publicKey: string;
}

export const imageKitAuthenticator =
  async (): Promise<ImageKitAuthenticator> => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/upload-auth"
      );
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data: ImageKitAuthenticator = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

/**
 * Uploads media files to ImageKit.
 *
 * @param files - Media files to upload
 * @param folderName - Destination folder in ImageKit
 *
 * @returns An object containing:
 * - `success` — Whether the upload succeeded
 * - `message` — Status or error message
 * - `data` — Upload responses (only present on success)
 */
export const uploadImagesToImageKit = async (
  files: File[],
  folderName: string
): Promise<
  | {
      success: true;
      message: string;
      data: UploadResponse[];
    }
  | {
      success: false;
      message: string;
    }
> => {
  try {
    const uploadedImages: UploadResponse[] = [];

    for (const file of files) {
      // Generate a new token every time
      const { expire, publicKey, signature, token } =
        await imageKitAuthenticator();
      const uploadedImage = await upload({
        file,
        fileName: file.name,
        folder: folderName,
        publicKey,
        signature,
        token,
        expire,
      });

      uploadedImages.push(uploadedImage);
    }

    return {
      success: true,
      data: uploadedImages,
      message: "Images uploaded successfully.",
    };
  } catch (error) {
    const errMsg = errorHandler(error, "Failed to upload image to imagekit");
    return {
      success: false,
      message: errMsg,
    };
  }
};
