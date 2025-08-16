/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure native module is available to server components and route handlers
  serverExternalPackages: ['better-sqlite3'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('better-sqlite3');
    }
    return config;
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
