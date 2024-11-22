/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
