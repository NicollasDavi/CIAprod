"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { TiHome } from "react-icons/ti";
import { MdAttachMoney } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaCalendarAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import axiosInstance from '../app/axiosInstance';
import { BiSolidData } from 'react-icons/bi';
import { useRenderContext } from '../app/context/renderContext';

const MobileAsideBar = () => {
  const handleLogOut = () => {
    const matricula = 105404;
    axiosInstance.post(`/logout/${matricula}`)
      .then(response => {
        console.log("saiu")
        localStorage.removeItem('token');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };
  const {admin} = useRenderContext()

  const [expanded, setExpanded] = useState(true);

  return (
    <div className='block md:hidden h-screen w-2/12 fixed left-0 z-50'>
    <div className={`bg-[#3b82f6] w-full ${expanded? ' h-full' : 'h-1/6 absolute bottom-0 bg-inherit'} transition-all`}>
      <div className={`${expanded? 'block' : 'hidden'}`}>
      <section className={`pt-4`}>
      <Link href={"/pages/calendario"} className='text-4xl text-center text-white'>
          <CiLogout  className='m-auto'/>
        </Link>
        <hr className='mt-3'/>
      </section>
      <section className='w-6/12 m-auto mt-20'>
        <Link href={"/pages/home"} className='text-4xl text-center text-white'>
          <TiHome className='m-auto'/>
        </Link>
      </section>
      <section className='w-6/12 m-auto mt-8'>
        <Link href={"/pages/dev"} className='text-4xl text-center text-white'>
          <MdAttachMoney className='m-auto'/>
        </Link>
      </section>
      <section className='w-6/12 m-auto mt-8'>
        <Link href={"/pages/infos"} className='text-4xl text-center text-white'>
          <FaInfo className='m-auto'/>
        </Link>
      </section>
      <section className='w-6/12 m-auto mt-8'>
        <Link href={"/pages/docs"} className='text-4xl text-center text-white'>
          <SiGoogledocs className='m-auto'/>
        </Link>
      </section>
      <section className='w-6/12 m-auto mt-8'>
          {admin ? <Link href={"/pages/datalist"} className='text-4xl text-center text-white'>
            <BiSolidData className='m-auto'/>
          </Link> : ""}
        </section>
      {/* <section className='w-6/12 m-auto mt-8'>
        <Link href={"/pages/calendario"} className='text-4xl text-center text-white'>
          <FaCalendarAlt className='m-auto'/>
        </Link>
      </section> */}
      </div>
        <section className={`absolute bottom-5 left-0 right-0 ${expanded? '' : 'bg-[#3b82f6] rounded-xl ml-2 mb-10'}`}>
          <hr className={`mb-3 ${expanded? '' : 'hidden' }`}/>
            <button onClick={() => setExpanded(!expanded)} className={`text-4xl inline-block text-white `}>
              <Image alt="" src="/Branco.png" width={1000} height={1000} className={` h-full m-auto ${expanded? 'w-4/6' : 'w-full p-2 '}`}/> 
            </button>
        </section>
    </div>
  </div>
  );
};

export default MobileAsideBar;
