"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Camera, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

const ProfileInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-6"
    >
      <Card variant="default" className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-accent to-orange-400 flex items-center justify-center text-3xl font-bold text-accent-foreground">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">John Doe</h2>
            <p className="text-muted-foreground flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              Host since January 2024
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input defaultValue="John" />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input defaultValue="Doe" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input defaultValue="john@example.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input defaultValue="+1 (555) 123-4567" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Business Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                defaultValue="123 Business St, New York, NY 10001"
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <Button variant="accent" className="mt-6">
          Save Changes
        </Button>
      </Card>
    </motion.div>
  );
};

export default ProfileInfo;
