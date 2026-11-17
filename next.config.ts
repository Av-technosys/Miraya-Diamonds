import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_S3_URL: process.env.NEXT_PUBLIC_S3_URL || process.env.AWS_S3_PUBLIC_URL || process.env.AWS_S3_CUSTOM_DOMAIN || "",
    NEXT_PUBLIC_S3_PREFIX: process.env.AWS_S3_PREFIX || (process.env.AWS_S3_BUCKET_NAME || "").split("/").slice(1).join("/"),
  },
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
