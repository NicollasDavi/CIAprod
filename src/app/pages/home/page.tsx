"use client"
import PDFViewer from '@/src/components/pdf';
import Carousel from '../../../components/Carousel';
import MiniCalender from '../../../components/MiniCalender';
import axiosInstance from '../../../app/axiosInstance';
import { useEffect, useState } from 'react';
import NotificationCarousel from '@/src/components/Notifications/NotificationCarousel';



interface CarouselItem {
  id: string;
  image: string;
  createdAt: Date;
}

const Page = () => {
  const [pdf, setPdf] = useState(null);
  const [carouselImgs, setCarouselImgs] = useState<CarouselItem[]>([]);
  const [avisos, setAvisos] = useState([])

    useEffect(() => {
        axiosInstance.get("/alerts").then(response => {
            setAvisos(response.data)
        })
    })


  useEffect(() => {
    axiosInstance.get('/carousel/p')
      .then(response => {
        setCarouselImgs(response.data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }, []);


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
       <section className='ml-auto md:mr-20 mr-5 text-xl flex w-11/12 rounded-xl mt-4 md:hidden'>
                    <NotificationCarousel items={avisos} />
                </section>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Ultimas novidades!</h1>
        <Carousel items={carouselImgs} />
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
