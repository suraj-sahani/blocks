"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
export default function BookingFilters() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex gap-3 mb-6">
        {["All", "Active", "Confirmed", "Completed", "Cancelled"].map(
          (filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "default" : "outline"}
              size="sm"
            >
              {filter}
            </Button>
          )
        )}
      </div>
    </motion.div>
  );
}
