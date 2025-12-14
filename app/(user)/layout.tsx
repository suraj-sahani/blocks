import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1">{children}</section>
    </main>
  );
}
