export const authenticator = async () => {
  try {
    const response = await fetch("/api/image-kit");

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    console.error(error);
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
