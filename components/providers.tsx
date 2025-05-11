"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { authenticator } from "@/lib/imagekit";
import { ImageKitProvider } from "@imagekit/next";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageKitProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IAMGEKIT_URL_ENDPOINT}
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
