/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    env: {
      API: process.env["NEXT_PUBLIC_APP_ENV"],
    },
  },
};

export default nextConfig;
