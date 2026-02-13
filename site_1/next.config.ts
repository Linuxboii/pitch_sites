import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    N8N_BASE_URL: process.env.N8N_BASE_URL,
    N8N_API_KEY: process.env.N8N_API_KEY,
  },
};

export default nextConfig;
