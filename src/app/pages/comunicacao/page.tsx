"use client"
import React, { useState } from 'react';
import { Camera, FileText } from 'react-feather'; // Importe os ícones que deseja usar
import Carousel from '@/src/components/Carousel';
import PDF from '@/src/components/UniquePdf';
import AvisosCheck from '@/src/components/AvisosCheck';

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
  
    const [carouselFile, setCarouselFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
  
    const handleCarouselFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setCarouselFile(event.target.files[0]);
      }
    };
  
    const handlePdfFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setPdfFile(event.target.files[0]);
      }
    };
  
    const convertFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result && typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert file to base64'));
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    };
  
    // Função para converter o arquivo do carrusel em base64
    const handleConvertCarouselToBase64 = async () => {
      if (carouselFile) {
        try {
          const base64String = await convertFileToBase64(carouselFile);
          console.log('Base64 string do carrusel:', base64String);
        } catch (error) {
          console.error('Erro ao converter arquivo para base64:', error);
        }
      }
    };
  
    // Função para converter o arquivo PDF em base64
    const handleConvertPdfToBase64 = async () => {
      if (pdfFile) {
        try {
          const base64String = await convertFileToBase64(pdfFile);
          console.log('Base64 string do PDF:', base64String);
        } catch (error) {
          console.error('Erro ao converter arquivo para base64:', error);
        }
      }
    };
  return (
    <div className="pt-8">
      <div className="w-11/12 md:w-9/12 m-auto h-auto mb-3">
        <h1 className="ml-1 pb-2 pt-10 md:pt-12 text-3xl font-bold">Comunicação</h1>
      </div>
      <div className="w-11/12 m-auto h-auto mb-10 md:pl-28">
        <div className="w-full p-4 shadow">
          <h1 className="text-2xl font-bold">Carrusel Atual</h1>
          <div className="flex flex-row">
            <section className="w-6/12  p-2">
              <Carousel items={items} key="" />
            </section>
            <section className="w-6/12 flex flex-col p-2">
                {carouselFile 
                ?
                <>
                    <img src={URL.createObjectURL(carouselFile)} alt=""  className=" w-3/12 flex items-center m-auto"/>                
                </> 
                :
                <>
                    <label htmlFor="carousel-file"  className="cursor-pointer flex items-center space-x-2 m-auto bg-blue1/20 p-20 rounded-xl">
                        <Camera />
                    </label>
                    <input
                        id="carousel-file"
                        type="file"
                        className="hidden"
                        onChange={handleCarouselFileChange}
                    />
                </>
                }
             
              <button
                className="w-3/12 text-white m-auto shadow bg-blue1 rounded-xl px-2 py-1 mt-10"
                onClick={handleConvertCarouselToBase64}
              >
                Editar
              </button>
            </section>
          </div>
        </div>
        <div className="w-full p-4 shadow mt-4">
  <h1 className="text-2xl font-bold">PDF Atual</h1>
  <div className="flex flex-row">
    <section className=" m-auto shadow-lg p-2">
      <PDF pdfUrl="/info.pdf" />
    </section>
    <section className="w-6/12 flex flex-col p-2">
      {pdfFile ? (
        <>
          <section className=" m-auto shadow-lg p-2">
            <PDF pdfUrl={URL.createObjectURL(pdfFile)} />
           </section>
        </> 
      ) : (
        <>
          <label htmlFor="pdf-file" className="cursor-pointer flex items-center space-x-2 m-auto bg-blue1/20 p-20 rounded-xl">
            <FileText />
          </label>
          <input
            id="pdf-file"
            type="file"
            className="hidden"
            onChange={handlePdfFileChange}
          />
        </>
      )}
      <button
        className="w-3/12 text-white m-auto shadow bg-blue1 rounded-xl px-2 py-1 mt-5"
        onClick={handleConvertPdfToBase64}
      >
        Desativar
      </button>
    </section>
  </div>
</div>

       <AvisosCheck />
      </div>
    </div>
  );
};

export default Page;
