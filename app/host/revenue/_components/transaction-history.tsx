"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, DollarSign, Download } from "lucide-react";
import { motion } from "motion/react";

const TransactionHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card variant="default" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
        <div className="space-y-4">
          {[
            {
              type: "Booking",
              desc: "Downtown Garage - Sarah M.",
              amount: "+$40",
              date: "Dec 15, 2024",
            },
            {
              type: "Withdrawal",
              desc: "Bank Transfer",
              amount: "-$500",
              date: "Dec 10, 2024",
            },
            {
              type: "Booking",
              desc: "EV Station 2 - Michael C.",
              amount: "+$18",
              date: "Dec 10, 2024",
            },
          ].map((tx, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "Booking" ? "bg-green-100" : "bg-orange-100"
                  }`}
                >
                  {tx.type === "Booking" ? (
                    <DollarSign className="w-5 h-5 text-green-600" />
                  ) : (
                    <Building2 className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{tx.type}</p>
                  <p className="text-sm text-muted-foreground">{tx.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.amount.startsWith("+")
                      ? "text-green-600"
                      : "text-foreground"
                  }`}
                >
                  {tx.amount}
                </p>
                <p className="text-sm text-muted-foreground">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default TransactionHistory;
