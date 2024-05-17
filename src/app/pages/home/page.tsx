"use client"
import PDFViewer from '@/src/components/pdf';
import Carousel from '../../../components/Carousel';
import MiniCalender from '../../../components/MiniCalender';
import Link from 'next/link';
const Page = () => {

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
  return (
    <div className=' pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Ultimas novidades!</h1>
        <Carousel items={items} />
      </div>
      <div className='md:hidden flex justify-center pt-2 md:pt-24'>
        <MiniCalender />
    </div>

      {/* <div className='w-full m-auto'>
        <section className='m-auto md:mt- pt-4 flex-col gap-5 md:flex-row flex justify-between w-9/12'>
            <Link href={"/pages/calculadora"} className='bg-blue-500 text-center py-3 md:px-10 md:py-3 rounded-lg text-white md:mr-4'>Calculadora</Link>
        </section>
    </div> */}
    <div className='md:flex justify-center pt-10 hidden'>
        <MiniCalender />
    </div>
    <div className='w-screen pt-10'>
      <PDFViewer pdfUrl="/info.pdf"/>
    </div>
    </div>
  );
};

export default Page;
