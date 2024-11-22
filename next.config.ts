import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com",
      "mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com",
      "drive.google.com",
    ],
  },
};

export default nextConfig;
