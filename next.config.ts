import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3072],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 200, 256, 320, 384, 480, 640, 750, 828, 1080],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
      "lucide-react",
      "date-fns",
      "@base-ui/react",
    ],
  },
};

export default nextConfig;
