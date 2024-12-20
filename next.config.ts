import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "classmind-general-uploads.s3.eu-north-1.amazonaws.com",
        port: "",
        // pathname: '/account123/**',
        search: "",
      },
    ],
  },
};

export default nextConfig;
