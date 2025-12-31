"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { seedLocations } from "@/lib/seed/states_cities";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  return (
    <section className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-2xl font-semibold">
        Scratchpad for testing random things
      </h1>

      <Button
        variant="outline"
        onClick={async () => {
          setLoading(true);
          // Do something here
          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : "Seed States & Cities"}
      </Button>
    </section>
  );
}
