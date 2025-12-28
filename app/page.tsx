"use client";
import { motion } from "motion/react";
import {
  Car,
  Zap,
  MapPin,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Search,
  CalendarDays,
  Wallet,
  Users,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

const stats = [
  { value: "50K+", label: "Parking Spots" },
  { value: "15K+", label: "EV Stations" },
  { value: "1M+", label: "Happy Users" },
  { value: "100+", label: "Cities" },
];

const features = [
  {
    icon: Search,
    title: "Easy Search",
    description:
      "Find available parking and EV charging spots in seconds with our smart search.",
  },
  {
    icon: Clock,
    title: "Real-Time Availability",
    description:
      "See live availability and reserve your spot before you arrive.",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments are protected with enterprise-grade security.",
  },
  {
    icon: Wallet,
    title: "Flexible Payments",
    description: "Pay by hour, day, or month. Cancel anytime with full refund.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Daily Commuter",
    content:
      "ParkVolt has transformed my daily commute. No more circling blocks looking for parking!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "EV Owner",
    content:
      "Finding reliable EV charging spots used to be a nightmare. ParkVolt made it effortless.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Property Host",
    content:
      "I earn passive income by renting out my unused parking spot. Amazing platform!",
    rating: 5,
  },
];

export default function Home() {
  return (
    <section className="min-h-sceen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-br from-primary/5 to-teal-400/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-8"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Smart Parking & EV Charging Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
              >
                Park Smarter,{" "}
                <span className="gradient-text">Charge Faster</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                Find and book parking spots and EV charging stations near you.
                Easy reservations, seamless payments, and real-time
                availability.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button variant="hero" size="xl" asChild>
                  <Link href="/search">
                    <Search className="w-5 h-5 mr-2" />
                    Find Parking Now
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/sign-up?type=host">
                    Become a Host
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-border"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything You Need to Park & Charge
              </h2>
              <p className="text-muted-foreground text-lg">
                A complete solution for finding, booking, and managing your
                parking and EV charging needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="interactive" className="h-full p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Book your spot in three simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  icon: Search,
                  title: "Search",
                  description:
                    "Enter your location and time to find available spots nearby.",
                },
                {
                  step: "02",
                  icon: CalendarDays,
                  title: "Book",
                  description:
                    "Select your preferred spot and reserve it instantly.",
                },
                {
                  step: "03",
                  icon: Car,
                  title: "Park & Charge",
                  description:
                    "Arrive at your spot and enjoy hassle-free parking or charging.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-teal-400 text-primary-foreground mb-6 shadow-glow">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Hosts Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-2 mb-6">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    For Property Owners
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Turn Your Empty Space Into{" "}
                  <span className="gradient-text">Passive Income</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  List your parking space or EV charging station and start
                  earning. Join thousands of hosts who make extra income every
                  month.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Set your own prices and availability",
                    "Secure and verified renters",
                    "Fast payouts to your bank",
                    "24/7 support and insurance",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="accent" size="lg" asChild>
                  <Link href="/sign-up?type=host">
                    Start Hosting
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-linear-to-br from-primary/20 to-teal-400/20 rounded-3xl p-8 relative">
                  <Card
                    variant="elevated"
                    className="absolute top-8 right-8 p-4 animate-float"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          This Month
                        </p>
                        <p className="text-xl font-bold text-foreground">
                          $2,847
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card
                    variant="elevated"
                    className="absolute bottom-16 left-4 p-4 animate-float-delayed"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CalendarDays className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          New Booking
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          Spot #3 Reserved
                        </p>
                      </div>
                    </div>
                  </Card>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-linear-to-br from-primary to-teal-400 flex items-center justify-center shadow-glow">
                      <div className="w-40 h-40 rounded-full bg-card flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-foreground">
                            3
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Active Spots
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Loved by Thousands
              </h2>
              <p className="text-muted-foreground text-lg">
                See what our users have to say about ParkVolt
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="h-full p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-accent text-accent"
                          />
                        )
                      )}
                    </div>
                    <p className="text-foreground mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-teal-400 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-linear-to-br from-primary to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Park Smarter?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10">
                Join over a million users who have already discovered the
                easiest way to find parking and EV charging spots.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="xl"
                  className="bg-white text-primary hover:bg-white/90 shadow-xl"
                  asChild
                >
                  <Link href="/sign-up">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="glass"
                  size="xl"
                  className="text-primary-foreground border-white/30"
                  asChild
                >
                  <Link href="/search">Explore Spots</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </section>
  );
}
