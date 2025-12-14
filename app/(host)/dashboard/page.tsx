"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import {
  DollarSign,
  TrendingUp,
  CalendarCheck,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import PageInfo from "@/components/host/page-info";

const stats = [
  {
    label: "Total Revenue",
    value: "$12,847",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
  },
  {
    label: "Active Bookings",
    value: "23",
    change: "+5",
    up: true,
    icon: CalendarCheck,
  },
  { label: "Total Listings", value: "8", change: "0", up: true, icon: MapPin },
  {
    label: "Occupancy Rate",
    value: "78%",
    change: "+3.2%",
    up: true,
    icon: TrendingUp,
  },
];

const recentBookings = [
  {
    id: 1,
    user: "Sarah M.",
    location: "Spot A1",
    date: "Today, 2:00 PM",
    amount: "$24",
    status: "Active",
  },
  {
    id: 2,
    user: "Michael R.",
    location: "EV Station 2",
    date: "Today, 11:00 AM",
    amount: "$18",
    status: "Completed",
  },
  {
    id: 3,
    user: "Emily L.",
    location: "Spot B3",
    date: "Yesterday",
    amount: "$32",
    status: "Completed",
  },
];

const HostDashboard = () => {
  return (
    <>
      <PageInfo title="Dashboard" subtitle="Welcome back, John!" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 p-8"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glow" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.up ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {stat.up ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card variant="default" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{booking.user}</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {booking.location}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {booking.date}
                    </td>
                    <td className="py-4 px-4 font-semibold text-primary">
                      {booking.amount}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default HostDashboard;
