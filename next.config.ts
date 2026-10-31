import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "/explore",
        permanent: true,
      },
      {
        source: "/spider-people/:slug",
        destination: "/characters/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
