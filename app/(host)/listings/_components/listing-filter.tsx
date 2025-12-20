"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
export default function ListingFilter() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            All
          </Button>
          <Button variant="ghost" size="sm">
            Parking
          </Button>
          <Button variant="ghost" size="sm">
            EV Charging
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="hero" size="sm" asChild>
            <Link href="/host/add-parking">
              <Plus className="w-4 h-4 mr-1" />
              Add Parking
            </Link>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link href="/host/add-ev-station">
              <Plus className="w-4 h-4 mr-1" />
              Add EV Station
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
