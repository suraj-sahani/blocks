"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  return (
    <section className="h-screen w-full flex flex-col gap-4 items-center justify-center">
      <h1>Test Something</h1>
      <Input
        type="file"
        className="max-w-sm"
        onChange={(e) => {
          const files = e.target.files;
          if (!files || files.length === 0) return;
          setImage(files[0]);
        }}
      />
      <Button
        variant="outline"
        onClick={async () => {
          setLoading(true);

          setLoading(false);
        }}
      >
        {loading ? <Spinner /> : "Upload Image"}
      </Button>
    </section>
  );
}
