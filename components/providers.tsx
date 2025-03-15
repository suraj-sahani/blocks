"use client";
import React from "react";
import { ImageKitProvider } from "imagekitio-next";
import { Toaster } from "react-hot-toast";
import { authenticator } from "@/lib/imagekit";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IAMGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IAMGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      {/* ...child components */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          style: {
            fontWeight: 600,
          },
        }}
      />
      {children}
    </ImageKitProvider>
  );
};

export default Providers;
