import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      { source: '/plasma-cosmos', destination: '/plasma-cosmos.html' },
    ];
  },
};

export default nextConfig;
