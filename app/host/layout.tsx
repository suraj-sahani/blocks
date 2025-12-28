import { HostSidebar } from "@/components/host/sidebar";
import { ReactNode } from "react";

export default function HostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <HostSidebar />
      <main
        style={{
          marginLeft: "var(--host-sidebar-width, 280px)",
        }}
        className="transition-all duration-300"
      >
        {children}
      </main>
    </div>
  );
}
