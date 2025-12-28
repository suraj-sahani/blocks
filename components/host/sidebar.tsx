"use client";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  MapPin,
  Wallet,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Car,
  Zap,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/host/dashboard" },
  { icon: CalendarCheck, label: "Bookings", path: "/host/bookings" },
  { icon: MapPin, label: "My Listings", path: "/host/listings" },
  { icon: Wallet, label: "Revenue", path: "/host/revenue" },
  { icon: User, label: "Profile", path: "/host/profile" },
] as const;

const addMenuItems = [
  { icon: Car, label: "Add Parking", path: "/host/add-parking-area" },
  { icon: Zap, label: "Add EV Station", path: "/host/add-ev-station" },
] as const;

export const HostSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 bottom-0 bg-card border-r border-border z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-accent-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Park<span className="text-primary">Volt</span>
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          {!collapsed && (
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Add New
            </p>
          )}
          <div className="space-y-1">
            {addMenuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* User Section */}
      <div className="p-3 border-t border-border">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-teal-400 flex items-center justify-center text-primary-foreground font-semibold">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">
                Host Account
              </p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="shrink-0">
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
