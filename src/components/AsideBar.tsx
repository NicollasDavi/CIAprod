// components/AsideBar.js
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { TiHome } from "react-icons/ti";
import { MdAttachMoney, MdCalculate } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { BiSolidData } from "react-icons/bi";
import { PiNewspaperFill } from "react-icons/pi";
import Joyride from "react-joyride";
import axiosInstance from '../app/axiosInstance';
import { useRenderContext } from '../app/context/renderContext';


interface AsideRideProps {
  onStartRide: () => void;
}

const AsideBar = ({ onStartRide } : AsideRideProps) => {
  const { admin } = useRenderContext();
  const [startRide, setStartRide] = useState(false);

  const handleLogOut = () => {
    const matricula = 105404;
    axiosInstance.post(`/logout/${matricula}`)
      .then(response => {
        console.log("saiu");
        localStorage.removeItem('token');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  const [{ run, steps }, setState] = useState({
    run: startRide,
    steps: [
      {
        title: <h2>Pagina Home</h2>,
        target: ".Home",
        content: "Esse icone ira te redirecionar para a pagina inicial",
      },
      {
        title: <h2>Pagina de Informações</h2>,
        target: ".Info",
        content: "Essa pagina guarda as principais informações do Curso Positivo para você"
      },
      {
        title: <h2>Pagina de documentos</h2>,
        target: ".Doc",
        content: "Essa pagina guarda os documentos publicos e seus documentos personalizados"
      },
      {
        title: <h2>Calculadora</h2>,
        target: ".Calc",
        content: "A calculadora CIA pode calcular e gerar descontos de uma maneira rapida e facil!"
      },
      {
        title: <h2>Gerenciador de dados</h2>,
        target: ".Data",
        content: "Aqui o Administrador podera gerir as informações e criar novas"
      },
      {
        title: <h2>Aréa de divulgações</h2>,
        target: ".Com",
        content: "Area dedicada para a inclusão e gerenciamento das informações divulgadas"
      },
      {
        title: <h2>Log out</h2>,
        target: ".Log",
        content: "Aqui você podera se desconectar"
      }
    ]
  });

  return (
    <div className='hidden md:block h-screen w-1/12 fixed left-0 z-50'>
      <Joyride
        callback={() => {}}
        run={run}
        steps={steps}
        showSkipButton
        showProgress
        continuous
        disableScrolling
        disableScrollParentFix
        styles={{
          options: {
            arrowColor: '#e3ffeb',
            primaryColor: '#3B82F6',
            textColor: '#000',
            width: 300,
            zIndex: 1000,
          },
        }}
      />
      <div className='bg-[#3B82F6] w-full h-full'>
        <section className='pt-4'>
          <Image alt="" src="/Branco.png" width={1000} height={1000} className="w-4/6 h-full m-auto px-1" />
          <hr className='mt-3' />
        </section>
        <section className='w-6/12 m-auto mt-20'>
          <Link href="/pages/home" className='text-4xl text-center text-white Home'>
            <TiHome className='m-auto' />
          </Link>
        </section>
        <section className='w-6/12 m-auto mt-8'>
          <Link href="/pages/dev" className='text-4xl text-center text-white'>
            <MdAttachMoney className='m-auto' />
          </Link>
        </section>
        <section className='w-6/12 m-auto mt-8'>
          <Link href="/pages/infos" className='text-4xl text-center text-white Info'>
            <FaInfo className='m-auto' />
          </Link>
        </section>
        <section className='w-6/12 m-auto mt-8'>
          <Link href="/pages/docs" className='text-4xl text-center text-white Doc'>
            <SiGoogledocs className='m-auto' />
          </Link>
        </section>
        <section className='w-6/12 m-auto mt-8'>
          <Link href="/pages/calculadora" className='text-4xl text-center text-white Calc'>
            <MdCalculate className='m-auto' />
          </Link>
        </section>
        {admin && (
          <>
            <section className='w-6/12 m-auto mt-8'>
              <Link href="/pages/datalist" className='text-4xl text-center text-white Data'>
                <BiSolidData className='m-auto' />
              </Link>
            </section>
            <section className='w-6/12 m-auto mt-8'>
              <Link href="/pages/comunicacao" className='text-4xl text-center text-white Com'>
                <PiNewspaperFill className='m-auto' />
              </Link>
            </section>
          </>
        )}
        <div className='w-full'>
          <section className='fixed bottom-5 left-0 right-0 text-white text-center p-4 w-1/12'>
            <hr className='mb-4' />
            <button onClick={handleLogOut} className='text-4xl inline-block Log'>
              <CiLogout className='inline-block' />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AsideBar;
