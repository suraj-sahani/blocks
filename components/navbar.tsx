"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Car, Menu, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserProfile from "./user-profile";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHome
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-xl border-b border-border"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/search"
              className="text-foreground/70 hover:text-foreground transition-colors font-medium"
            >
              Find Parking
            </Link>
            <Link
              href="/search?type=ev"
              className="text-foreground/70 hover:text-foreground transition-colors font-medium"
            >
              EV Charging
            </Link>
            <Link
              href="/sign-up?type=host"
              className="text-foreground/70 hover:text-foreground transition-colors font-medium"
            >
              Become a Host
            </Link>
          </div>

          {/* Auth Buttons */}
          <UserProfile className="hidden md:inline-flex" />

          {/* Mobile Navigation */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
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
                </SheetTitle>
                <SheetDescription>
                  Find parking and EV charging spaces near you.
                </SheetDescription>
              </SheetHeader>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 border-t border-border bg-background/95 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4">
                  <Link
                    href="/search"
                    className="px-4 py-2 text-foreground/70 hover:text-foreground transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find Parking
                  </Link>
                  <Link
                    href="/search?type=ev"
                    className="px-4 py-2 text-foreground/70 hover:text-foreground transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    EV Charging
                  </Link>
                  <Link
                    href="/sign-up?type=host"
                    className="px-4 py-2 text-foreground/70 hover:text-foreground transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Become a Host
                  </Link>

                  <UserProfile className="px-2" />
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};
