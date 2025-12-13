"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImageKitContext, ImageKitProvider } from "@imagekit/next";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageKitContext
        value={{
          urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL,
        }}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toasterId="default"
          toastOptions={{
            className: "font-semibold text-sm rounded-lg!",
            // style: { borderRadius: 12 },
            duration: 5000,
            removeDelay: 2000,
          }}
        />
        {children}
      </ImageKitContext>
    </QueryClientProvider>
  );
}
