import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here *//** @type {import('next').NextConfig} */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ruaapcyakjikwgvxlear.supabase.co",
        port: "",
      },
    ],
  },

};

export default nextConfig;
