"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import clientLogger from "@/lib/pino/client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  return (
    <section className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1>Test Something</h1>

      <Button
        variant="outline"
        onClick={() => {
          clientLogger.error("test");
        }}
      >
        {loading ? <Spinner /> : "Upload Image"}
      </Button>
    </section>
  );
}
