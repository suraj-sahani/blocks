import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const quickSand = Quicksand({
  variable: "--font-quick-sand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Find Your Ideal Parking Spot/EV Charging Station In Few Minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body
        className={`${quickSand.className} antialiased relative flex flex-col h-screen w-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
