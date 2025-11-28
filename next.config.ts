import type { NextConfig } from "next";
import { ENV_SCHEMA } from "./lib/schema";


ENV_SCHEMA.parse(process.env);

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
