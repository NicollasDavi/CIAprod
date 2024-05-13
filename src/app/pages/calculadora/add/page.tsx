"use client"
import axiosInstance from '../../../../app/axiosInstance'
import React, { useEffect, useState } from 'react'


const Page = () => {
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [turno, setTurno] = useState("");
    const [valor_e, setValor_e] = useState("");
    const [valor_m, setValor_m] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleEnv = async () => {
        if (!nome || !unidade || !turno || !valor_e || !valor_m) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);

        try {
            const curso = {
                nome,
                unidade,
                turno,
                valor_E: parseFloat(valor_e),
                valor_M: parseFloat(valor_m)
            };

            await axiosInstance.post('/valor', curso);
            setLoading(false);
            window.location.replace(`/pages/calculadora`);
        } catch (error) {
            setError("Ocorreu um erro ao criar o curso. Por favor, tente novamente.");
            setLoading(false);
        }
    };
  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Criar Curso</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10'>
        <input type="text" placeholder="Nome" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setNome(e.target.value)}/>

        <input type="text" placeholder="Unidade" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setUnidade(e.target.value)}/>

        <input type="text" placeholder="Turno" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setTurno(e.target.value)}/>

        <input type="number" placeholder="Valor Escola" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setValor_e(e.target.value)}/>

        <input type="number" placeholder="Valor Material" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setValor_m(e.target.value)}/>
        </div>
        <section className='mt-10 w-11/12 items-center flex'>
        <button className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg' onClick={handleEnv} disabled={loading}>
            {loading ? "Aguarde..." : "Criar Curso"}
        </button>
        </section>
            <div className="mt-4 text-red-500">{error}</div>
      </div>
    
      </div>
  )
}

export default Page