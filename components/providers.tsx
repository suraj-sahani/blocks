"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ImageKitContext, ImageKitProvider } from "@imagekit/next";

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
        {children}
      </ImageKitContext>
      {/* <ImageKitProvider key={process.env.NEXT_PUBLIC_IMAGEKIT_URL}>
        {children}
      </ImageKitProvider> */}
    </QueryClientProvider>
  );
}
