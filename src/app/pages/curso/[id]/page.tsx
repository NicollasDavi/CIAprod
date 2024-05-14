"use client"
import axiosInstance from '../../../../app/axiosInstance';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const handleRedirect = () => {
  window.location.href = "/pages/calculadora";
};

interface Curso{
  imagem: string,
  nome: string,
  turno: string,
  matricula: number,
  unidade: string,
  informacao: string,
}

const Page = () => {
  const id = window.location.pathname.split('/').pop();
  const [data, setData] = useState<Curso>();

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/curso/${id}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }
  }, [id]);

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Informações</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
        <div className='flex flex-row'>
            <div className='w-6/12 md:w-3/12 md:p-8'>
                <img alt='' src={data && data.imagem} width={1000} height={100} className='w-full rounded-lg'/>
            </div>
            <div className='md:pt-10 md:pl-10 pl-3 w-5/12'>
                <h1 className='text-2xl md:text-4xl font-bold'>{data && data.nome}</h1>
                <section className='pt-10 flex flex-col gap-5'>
                    <p>Turnos: {data && data.turno}</p>
                    <p>Matrícula: {data && data.matricula}</p>
                    <p>Unidade: {data && data.unidade}</p>
                </section>
                <section className='w-full p-3 pt-16 absolute left-0 md:static'>
                    <button className='bg-[#3B82F6] w-full py-3 rounded-lg text-white align-bottom' onClick={handleRedirect}>Ver Valores</button>
                </section>
            </div>
        </div>
        <div className='md:pt-5 pt-32'>
            <h1 className='text-sm pb-8'>Sobre o Curso</h1>
            <p className='w-11/12'>{data && data.informacao}</p>
        </div>
      </div>
    </div>
  )
}

export default Page;
