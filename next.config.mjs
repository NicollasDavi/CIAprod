// next.config.js

// Configurações do servidor Next.js
export async function headers() {
    return [
        {
            source: '/',
            headers: [
                {
                    key: 'Access-Control-Allow-Origin',
                    value: '*', // Altere para o domínio desejado se necessário
                },
            ],
        },
    ];
}

// Configurações do servidor Next.js
export const server = {
    host: '15.228.38.79', // Substitua pelo IP do seu servidor
    port: 29, // Porta que deseja utilizar
};
