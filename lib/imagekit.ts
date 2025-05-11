import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

/**
 * Authenticates and retrieves the necessary upload credentials from the server.
 *
 * This function calls the authentication API endpoint to receive upload parameters like signature,
 * expire time, token, and publicKey.
 *
 * @returns {Promise<{signature: string, expire: string, token: string, publicKey: string}>} The authentication parameters.
 * @throws {Error} Throws an error if the authentication request fails.
 */
export const authenticator = async () => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch("/api/upload-auth");
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    // Log the original error for debugging before rethrowing a new error.
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

/**
 * Handles the file upload process.
 *
 * This function:
 * - Validates file selection.
 * - Retrieves upload authentication credentials.
 * - Initiates the file upload via the ImageKit SDK.
 * - Updates the upload progress.
 * - Catches and processes errors accordingly.
 */
export const handleUpload = async (uploadedFiles: File[]) => {
  if (!uploadedFiles || uploadedFiles.length === 0) {
    return;
  }

  // Extract the first file from the file input
  const file = uploadedFiles[0];

  // Retrieve authentication parameters for the upload.
  let authParams;
  try {
    authParams = await authenticator();
  } catch (authError) {
    console.error("Failed to authenticate for upload:", authError);
    return;
  }
  const { signature, expire, token, publicKey } = authParams;

  // Call the ImageKit SDK upload function with the required parameters and callbacks.
  try {
    const uploadResponse = await upload({
      // Authentication parameters
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name, // Optionally set a custom file name
    });
    console.log("Upload response:", uploadResponse);
    return uploadResponse;
  } catch (error) {
    // Handle specific error types provided by the ImageKit SDK.
    if (error instanceof ImageKitAbortError) {
      console.error("Upload aborted:", error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error("Invalid request:", error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error("Network error:", error.message);
    } else if (error instanceof ImageKitServerError) {
      console.error("Server error:", error.message);
    } else {
      // Handle any other errors that may occur.
      console.error("Upload error:", error);
    }
  }
};
