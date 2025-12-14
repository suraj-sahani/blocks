"use client";
import { motion } from "motion/react";

export default function PageInfo({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="h-20 bg-card/50 backdrop-blur-xl border-b border-border sticky top-0 z-30">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-foreground"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </header>
  );
}
