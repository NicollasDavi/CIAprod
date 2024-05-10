"use client"
import withAuth from '../../../app/utils/withAuth';
import Carousel from '../../../components/Carousel';
import MiniCalender from '../../../components/MiniCalender';
import Link from 'next/link';
import React, { useEffect, useState} from 'react';




const Page = () => {

  const items = [
    {
      image: '/CIA.png',
      alt: 'Texto alternativo da imagem',
      caption: 'Legenda da imagem 1',
    },
    {
      image: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg',
      alt: 'Texto alternativo da imagem',
      caption: 'Legenda da imagem 2',
    },
  ];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log(token);
    }
  }, []);
  return (
    <div className=' pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Ultimas novidades!</h1>
        <Carousel items={items} />
      </div>
      <div className='md:hidden flex justify-center pt-2 md:pt-24'>
        <MiniCalender />
    </div>

      <div className='w-full m-auto'>
        <section className='m-auto md:mt- pt-4 flex-col gap-5 md:flex-row flex justify-between w-9/12'>
            <Link href={"/pages/calculadora"} className='bg-blue-500 text-center py-3 md:px-10 md:py-3 rounded-lg text-white md:mr-4'>Calculadora</Link>
        </section>
    </div>
    <div className='md:flex justify-center pt-20 hidden'>
        <MiniCalender />
    </div>

    </div>
  );
};

export default withAuth(Page);
