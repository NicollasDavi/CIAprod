"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import NotificationCarousel from './Notifications/NotificationCarousel';
import axiosInstance from "../app/axiosInstance"

const Header = () => {
    const [avisos, setAvisos] = useState([])

    useEffect(() => {
        axiosInstance.get("/alerts").then(response => {
            setAvisos(response.data)
        })
    })

    const [nome, setNome] = useState("");

    useEffect(() => {
        const nomeLocal = localStorage.getItem('nome');
        if (nomeLocal) {
            setNome(nomeLocal);
        }
    }, []);

    return (
        <div className='w-full fixed z-40 bg-white md:block'>
            <div className='md:ml-10 ml-5 md:py-2 py-2 flex flex-row items-center'>
                <section className='ml-auto md:mr-20 mr-5 text-xl flex w-4/12 rounded-xl'>
                    <NotificationCarousel items={avisos} />
                </section>
                <section className='ml-auto md:mr-20 mr-5 text-xl flex'>
                    <h1 className='ml-5 pt-1'>Olá, {nome}!</h1>
                    <Link href="/" className='ml-10 text-4xl'>
                        <FaUserCircle />
                    </Link>
                </section>
            </div>
            <hr />
        </div>
    );
};

export default Header;
