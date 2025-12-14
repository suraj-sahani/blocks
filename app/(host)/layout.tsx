import { HostSidebar } from "@/components/host/sidebar";
import { ReactNode } from "react";

export default function HostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <HostSidebar />
      <main className="ml-[280px] transition-all duration-300">{children}</main>
    </div>
  );
}
