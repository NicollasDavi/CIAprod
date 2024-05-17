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

  const [expanded, setExpanded] = useState(true);

  return (
    <div className='block md:hidden h-screen w-2/12 fixed left-0 z-50'>
    <div className='bg-[#3B82F6] w-full h-full'>
      <section className='pt-4'>
        <Image alt="" src="/Branco.png" width={1000} height={1000} className="w-4/6 h-full m-auto px-1"/>
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
        <Link href={"/pages/calendario"} className='text-4xl text-center text-white'>
          <FaCalendarAlt className='m-auto'/>
        </Link>
      </section>
      <div className='w-full'>
          <section className='fixed bottom-5 left-0 right-0  text-white text-center p-4 w-1/12'>
          <hr className='mb-4'/>
          <button onClick={handleLogOut} className='text-4xl inline-block'>
              <CiLogout  className='inline-block'/>
          </button>
          </section>
      </div>
      
    </div>
  </div>
  );

};

export default MobileAsideBar;
