import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
