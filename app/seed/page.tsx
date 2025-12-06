"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { seedCities } from "@/lib/seed/cities";
import { useState } from "react";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  return (
    <section className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1>Seed DB</h1>
      <Button
        variant="outline"
        onClick={async () => {
          setLoading(true);
          await seedCities();
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : "Start Seeding"}
      </Button>
    </section>
  );
}
