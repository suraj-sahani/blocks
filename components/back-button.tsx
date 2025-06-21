"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
};

const BackButton = ({ title }: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button
        size={"icon"}
        className="bg-transparent hover:bg-gray-100 text-black shadow-none"
        onClick={() => router.back()}
      >
        <ChevronsLeft size={32} />
      </Button>
      <span className="text-md md:text-2xl font-bold">{title}</span>
    </div>
  );
};

export default BackButton;
