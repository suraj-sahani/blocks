"use client";
import { Card } from "@/components/ui/card";
import { Bell, CreditCard, Shield } from "lucide-react";
import { motion } from "motion/react";

const ProfileExtras = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-6"
    >
      <div className="grid md:grid-cols-3 gap-4">
        <Card variant="interactive" className="p-4 flex items-center gap-3">
          <Shield className="w-8 h-8 text-accent" />
          <div>
            <h3 className="font-semibold">Security</h3>
            <p className="text-sm text-muted-foreground">Password & 2FA</p>
          </div>
        </Card>
        <Card variant="interactive" className="p-4 flex items-center gap-3">
          <Bell className="w-8 h-8 text-accent" />
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">Booking alerts</p>
          </div>
        </Card>
        <Card variant="interactive" className="p-4 flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-accent" />
          <div>
            <h3 className="font-semibold">Payout</h3>
            <p className="text-sm text-muted-foreground">Bank accounts</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProfileExtras;
