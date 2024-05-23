import React, { useState, useEffect } from 'react';

interface Address {
    logradouro: string;
    localidade: string;
    bairro: string;
}

const Adress = ({ cep }: { cep: string }) => {
    const [data, setData] = useState<Address | null>(null);

    useEffect(() => {
        async function getEndereco(cep: string) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar o endereço. Por favor, verifique o CEP e tente novamente.');
                }
                const endereco = await response.json();
                setData(endereco);
            } catch (error: any) {
                console.error('Erro:', error.message);
            }
        }

        getEndereco(cep);
    }, [cep]);

    return (
        <div>
            {data && (
                <>
                <section className='pt-10 flex flex-col gap-5'>
                    <h1>Logradouro: {data.logradouro}</h1>
                    <h1>localidade: {data.localidade}</h1>
                    <h1>Bairro: {data.bairro}</h1>
                </section>
                    
                </>
            )}
        </div>
    );
};

export default Adress;
