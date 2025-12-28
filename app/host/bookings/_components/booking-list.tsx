"use client";
import { Eye, MapPin, Calendar, Clock, Car, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { bookings } from "@/lib/constants";
export default function BookingList() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                  Guest
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                  Location
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                  Date & Time
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        {booking.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium">{booking.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          booking.type === "ev"
                            ? "bg-green-100 text-green-600"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {booking.type === "ev" ? (
                          <Zap className="w-3 h-3" />
                        ) : (
                          <Car className="w-3 h-3" />
                        )}
                      </span>
                      {booking.location}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-3 h-3" />
                      {booking.time}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-primary">
                    {booking.amount}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Confirmed"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
