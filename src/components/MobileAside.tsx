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
    <div className={`md:hidden p-5 w-4/12 fixed left-0 z-50 transition-all duration-300 ${expanded ? 'h-screen absolute bottom-0' : 'absolute bottom-0'}`} onClick={() => setExpanded(!expanded)}>
      <div className='bg-[#3B82F6] w-full h-full rounded-[48px]'>
        <div className='w-full'>
          <section className={`fixed top-5 left-0 right-0 text-white text-center p-4 w-4/12 ${expanded ? 'block' : 'hidden'}`}>
            <button onClick={() => setExpanded(!expanded)} className='text-4xl inline-block'>
              <CiLogout className='inline-block'/>
            </button>
          </section>
        </div>
        <section className={`${expanded ? 'pt-4' : 'hidden'}`}>
          <hr className='mt-12'/>
        </section>
        <section className={`w-6/12 m-auto mt-20 ${expanded ? 'block' : 'hidden'}`}>
          <Link href={"/pages/home"} className='text-4xl text-center text-white'>
            <TiHome className='m-auto'/>
          </Link>
        </section>
        <section className={`w-6/12 m-auto mt-8 ${expanded ? 'block' : 'hidden'}`}>
          <Link href={"/pages/dev"} className='text-4xl text-center text-white'>
            <MdAttachMoney className='m-auto'/>
          </Link>
        </section>
        <section className={`w-6/12 m-auto mt-8 ${expanded ? 'block' : 'hidden'}`}>
          <Link href={"/pages/infos"} className='text-4xl text-center text-white'>
            <FaInfo className='m-auto'/>
          </Link>
        </section>
        <section className={`w-6/12 m-auto mt-8 ${expanded ? 'block' : 'hidden'}`}>
          <Link href={"/pages/docs"} className='text-4xl text-center text-white'>
            <SiGoogledocs className='m-auto'/>
          </Link>
        </section>
        <section className={`w-6/12 m-auto mt-8 ${expanded ? 'block' : 'hidden'}`}>
          <Link href={"/pages/calendario"} className='text-4xl text-center text-white'>
            <FaCalendarAlt className='m-auto'/>
          </Link>
        </section>
        <section className={`${expanded ? 'pt-20' : ''}`}>
          <hr className={`${expanded ? 'mb-3' : 'pb-5'}`}/>
          <Image alt="" src="/Branco.png" width={1000} height={1000} className={`w-4/6 m-auto px-1 ${expanded? 'pb-3' : 'pb-5'}`}/>
        </section>
      </div>
    </div>
  );

};

export default MobileAsideBar;
