"use client";
import React, { useEffect, useState } from 'react';
import { Camera, FileText } from 'react-feather'; 
import Carousel from '@/src/components/Carousel';
import PDF from '@/src/components/UniquePdf';
import AvisosCheck from '@/src/components/AvisosCheck';
import axiosInstance from '../../../app/axiosInstance';
import { useRouter } from 'next/navigation';

interface PdfFile {
  id: string;
  url: string;
  createdAt: Date;
  active: boolean;
}

interface CarouselItem {
  id: string;
  image: string;
  createdAt: Date;
}

const Page = () => {
  const router = useRouter()
  const [carouselFile, setCarouselFile] = useState<File | null>(null);
  const [carouselImgs, setCarouselImgs] = useState<CarouselItem[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [actualyPdf, setActualyPdf] = useState<PdfFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPdf = async () => {
    try {
      const response = await axiosInstance.get("/pdf/adm");
      setActualyPdf(response.data);
    } catch (error) {
      console.error("Erro ao buscar PDF:", error);
      setError("Erro ao buscar PDF");
    }
  };

  const fetchCarousel = async () => {
    try {
      const response = await axiosInstance.get('/carousel');
      setCarouselImgs(response.data);
    } catch (error) {
      console.error('Erro ao buscar imagens do carrossel:', error);
      setError('Erro ao buscar imagens do carrossel');
    }
  };

  useEffect(() => {
    fetchPdf();
    fetchCarousel();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
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

  const handleConvertCarouselToBase64 = async () => {
    if (carouselFile) {
      setLoading(true);
      setError(null);
      try {
        const base64String = await convertFileToBase64(carouselFile);
        await axiosInstance.post("/carousel", base64String);
        console.log(base64String)
        fetchCarousel();
        setCarouselFile(null);
      } catch (error) {
        console.error('Erro ao converter arquivo para base64:', error);
        setError('Erro ao converter arquivo para base64');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConvertPdfToBase64 = async () => {
    if (pdfFile) {
      setLoading(true);
      setError(null);
      try {
        const base64String = await convertFileToBase64(pdfFile);
        console.log(base64String)
        await axiosInstance.put("/pdf", base64String);
        fetchPdf();
        setPdfFile(null);
      } catch (error) {
        console.error('Erro ao converter arquivo para base64:', error);
        setError('Erro ao converter arquivo para base64');
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleDisable = async () => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.patch("/pdf");
      fetchPdf();
    } catch (error) {
      console.error('Erro ao desativar PDF:', error);
      setError('Erro ao desativar PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8">
      <div className="w-11/12 md:w-9/12 m-auto h-auto mb-3">
        <h1 className="ml-1 pb-2 pt-10 md:pt-12">Comunicação</h1>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
      <div className="w-11/12 m-auto h-auto mb-10 md:pl-28">
        <div className="w-full p-4 shadow">
          <h1 className="text-2xl font-bold">Carousel Atual</h1>
          <div className="flex flex-row">
            <section className="w-6/12 p-2">
              <Carousel items={carouselImgs} />
            </section>
            <section className="w-6/12 flex flex-col p-2">
              {carouselFile 
                ? <img src={URL.createObjectURL(carouselFile)} alt="" className="w-3/12 flex items-center m-auto" />
                : <>
                    <label htmlFor="carousel-file" className="cursor-pointer flex items-center space-x-2 m-auto bg-blue1/20 p-20 rounded-xl">
                      <Camera />
                    </label>
                    <input
                      id="carousel-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setCarouselFile)}
                    />
                  </>
              }
              {carouselFile ? 
              <button
              className={`w-3/12 text-white m-auto shadow bg-blue1 rounded-xl px-2 py-1 mt-10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleConvertCarouselToBase64}
              disabled={loading}
            >
               Enviar
            </button>
              : <button
              className={`w-3/12 text-white m-auto shadow bg-blue1 rounded-xl px-2 py-1 mt-10 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => router.push("/pages/comunicacao/images")}
              disabled={loading}
            >
              Editar
            </button>}  
            </section>
          </div>
        </div>

        <div className="w-full p-4 shadow mt-4">
          <h1 className="text-2xl font-bold">PDF Atual</h1>
          <div className="flex flex-row">
            <section className="m-auto shadow-lg p-2">
              {actualyPdf && <PDF pdfUrl={actualyPdf.url} />}
            </section>
            <section className="w-6/12 flex flex-col p-2">
              {pdfFile 
                ? <section className="m-auto shadow-lg p-2">
                    <PDF pdfUrl={URL.createObjectURL(pdfFile)} />
                  </section>
                : <>
                    <label htmlFor="pdf-file" className="cursor-pointer flex items-center space-x-2 m-auto bg-blue1/20 p-20 rounded-xl">
                      <FileText />
                    </label>
                    <input
                      id="pdf-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setPdfFile)}
                    />
                  </>
              }
              <button
                className={`w-3/12 text-white m-auto shadow bg-blue1 rounded-xl px-2 py-1 mt-5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleConvertPdfToBase64}
                disabled={loading}
              >
                {pdfFile ? 'Atualizar' : (actualyPdf?.active ? 'Desativar' : 'Ativar')}
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
