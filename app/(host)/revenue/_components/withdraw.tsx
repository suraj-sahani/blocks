"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { motion } from "motion/react";

export default function Withdraw() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-3 gap-4">
        <Card variant="glow" className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold text-green-600">$2,847</p>
            </div>
          </div>
          <Button variant="hero" className="w-full">
            Withdraw Funds
          </Button>
        </Card>
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">$1,234</p>
              <span className="text-xs text-green-600 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +18% vs last month
              </span>
            </div>
          </div>
        </Card>
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="text-2xl font-bold">$12,847</p>
              <span className="text-xs text-muted-foreground">
                Since Jan 2024
              </span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
