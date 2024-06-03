"use client"
import PDFViewer from '@/src/components/pdf';
import Carousel from '../../../components/Carousel';
import MiniCalender from '../../../components/MiniCalender';
import axiosInstance from '../../../app/axiosInstance';
import { useEffect, useState } from 'react';

const Page = () => {
  const [pdf, setPdf] = useState(null);
  const items = [
    {
      image: '/t.jpg',
      alt: 'Texto alternativo da imagem',
      caption: 'Legenda da imagem 1',
    },
    {
      image: '/t.jpg',
      alt: 'Texto alternativo da imagem',
      caption: 'Legenda da imagem 2',
    },
  ];

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axiosInstance.get("/pdf");
        setPdf(response.data);
      } catch (error) {
        console.error("Erro ao buscar PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Ultimas novidades!</h1>
        <Carousel items={items} />
      </div>
      <div className='md:hidden flex justify-center pt-2 md:pt-24'>
        <MiniCalender />
      </div>
      <div className='md:flex justify-center pt-10 hidden'>
        <MiniCalender />
      </div>
      <div className='w-screen pt-10'>
        <PDFViewer pdfUrl={pdf}/>
      </div>
    </div>
  );
};

export default Page;
