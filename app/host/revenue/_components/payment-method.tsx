"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { motion } from "motion/react";
export default function PaymentMethods() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card variant="default" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payout Method</h2>
          <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Bank Account •••• 4567</p>
              <p className="text-sm text-muted-foreground">
                Chase Bank - Checking
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Change
            </Button>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
