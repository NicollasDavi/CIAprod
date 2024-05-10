"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";


const Header = () => {
  const [nome, setNome] = useState("")
  useEffect(() => {
    const nome1 = localStorage.getItem('nome')
    if(nome1)
    setNome(nome1)
  }, []);
  
  return (
    <div className='w-full fixed z-40 bg-white md:block  '>
      <div className='md:ml-32 md:py-4 py-3 flex flex-row items-center'>
        <section className='ml-auto md:mr-20 mr-5 text-xl flex'>
            <h1 className='ml-5 pt-1'>Olá, {nome}!</h1>
            <Link href={"/"} className='ml-10 text-4xl'>
                <FaUserCircle />
            </Link>
        </section>
      </div>
      <hr className=''/>
    </div>
  )
}

export default Header
