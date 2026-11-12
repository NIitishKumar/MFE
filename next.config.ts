import type { NextConfig } from 'next';

const resolvedEnvApiUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_BASE_URL ||
  process.env.API_URL ||
  ''
).trim();

const nextConfig: NextConfig = {
  ...(resolvedEnvApiUrl
    ? {
        env: {
          NEXT_PUBLIC_API_BASE_URL: resolvedEnvApiUrl,
          NEXT_PUBLIC_API_URL: resolvedEnvApiUrl,
        },
      }
    : {}),
};

export default nextConfig;
