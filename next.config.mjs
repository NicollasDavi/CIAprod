/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuração da base do caminho, se aplicável
    basePath: '/meu-app',
  
    // Manipulação de cabeçalhos para URLs absolutas
    async headers() {
      return [
        {
          source: '/',
          headers: [
            {
              key: 'X-Forwarded-Host',
              value: 'seu-host.com',
            },
          ],
        },
      ];
    },
  
    // Manipulação de redirecionamentos para URLs absolutas
    async redirects() {
      return [
        {
          source: '/old-path',
          destination: '/new-path',
          permanent: true,
        },
      ];
    },
  
    // Confie em cabeçalhos de proxy confiáveis
    serverRuntimeConfig: {
      trustProxy: true,
    },
  };
  
  export default nextConfig;
  