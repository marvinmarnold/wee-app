import type { NextConfig } from "next";
// import path from 'path'; // No longer needed if not using __dirname for outputFileTracingIncludes

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: { // Remove this entire experimental section if no other experimental features are used
  //   outputFileTracingIncludes: {
  //     '/api/create-repo': [
  //       path.join(__dirname, 'template/**/*'),
  //     ],
  //   },
  // },
};

export default nextConfig;
