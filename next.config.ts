import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore typescript errors during build to conserve memory and avoid worker crashes
    ignoreBuildErrors: true,
  },
  experimental: {
    // Limit Next.js build workers to 2 to prevent OOM/heap corruption on low-memory/high-core systems
    cpus: 2,
  },
};

export default nextConfig;


