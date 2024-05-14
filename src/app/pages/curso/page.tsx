"use client"
import Image from 'next/image'
import React from 'react'

const handleRedirect = () => {
  // Redirecionar para "/pages/calculadora"
  window.location.href = "/pages/calculadora";
};


const page = () => {

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Informações</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
        <div className='flex flex-row'>
            <div className='w-6/12 md:w-3/12 md:p-8'>
                <Image alt='' src={"/extensivo.png"} width={1000} height={100} className='w-full rounded-lg'></Image>
            </div>
            <div className='md:pt-10 md:pl-10 pl-3 w-5/12'>
                <h1 className='text-2xl md:text-4xl font-bold'>Extensivo</h1>
                <section className='pt-10 flex flex-col gap-5'>
                    <p>Ano: 2024</p>
                    <p>Matrícula: 22</p>
                    <p>Unidade: VM, HV, BV, PG, JV</p>
                </section>
                <section className='w-full p-3 pt-16 absolute left-0 md:static'>
                    <button className='bg-[#3B82F6] w-full py-3 rounded-lg text-white align-bottom' onClick={handleRedirect}>Ver Valores</button>
                </section>
            </div>
        </div>
        <div className='md:pt-5 pt-32'>
            <h1 className='text-sm pb-8'>Sobre o Curso</h1>
            <p className='w-11/12'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam placeat blanditiis expedita velit repellat autem quis molestias magnam tenetur. Nihil enim laudantium, rerum est officiis cumque dolores id! Eum, temporibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci fugiat tempora illum distinctio cupiditate amet illo dolor modi? Veniam repellat nihil libero dignissimos obcaecati maxime sit quos eum voluptas dicta!</p>
        </div>
      </div>
    </div>
  )
}

export default page