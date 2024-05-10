/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração da base do caminho, se aplicável
  basePath: '',

  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'X-Forwarded-Host',
            value: '15.228.38.79',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [];
  },

  serverRuntimeConfig: {
    trustProxy: true,
  },
};

export default nextConfig;
