/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
      if (dev && isServer) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      }
      return config;
    },
  };

export default nextConfig;
