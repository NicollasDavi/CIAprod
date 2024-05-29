"use client"
import Card from '@/src/components/Card';
import axiosInstance from '../../../axiosInstance';
import React, { useEffect, useState } from 'react';
import Adress from '@/src/components/Map';

const handleRedirect = () => {
  window.location.href = "/pages/calculadora";
};

interface Unidade {
  vcep: any,
  imagem: string,
  nome: string,
  numeroTel: string,
  numeroWpp: number,
  horario: string,
  informacoes: string,
}

interface Course {
  id: string;
  imagem: string;
}



const Page = () => {
  const id = window.location.pathname.split('/').pop();
  const [data, setData] = useState<Unidade>();
  const [cursos, setCursos] = useState<Course[]>([]);

  const renderParagraphsWithIndentation = (text: string) => {
    const paragraphs = text.split('\n');
    const indentedParagraphs = paragraphs.map((paragraph, index) => {
      if (index === 0 || !paragraph.trim()) {
        return paragraph;
      } else {
        return `    ${paragraph.trim()}`; 
      }
    });
    return indentedParagraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
  };

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/unidade/${id}`)
        .then(response => {
          console.log(response)
          setData(response.data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }
  }, [id]);

  console.log(data)

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/curso/unidade/${id}`)
        .then(response => {
          console.log(response)
          setCursos(response.data);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }
  }, [id]);

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Informações</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
        <div className='flex flex-row'>
          <div className='w-6/12 md:w-3/12 md:p-8'>
            <img alt='' src={data && data.imagem} width={1000} height={100} className='w-full rounded-lg'/>
          </div>
          <div className='md:pt-10 md:pl-10 pl-3 w-5/12'>
            <h1 className='text-2xl md:text-4xl font-bold'>{data && data.nome}</h1>
            <section className='flex flex-row gap-20'>
              <section className='pt-10 flex flex-col gap-5'>
              <p>Telefone: {data && data.numeroTel}</p>
              <p>Whatsapp: {data && data.numeroWpp}</p>
              <p>Horário: {data && data.horario}</p>
            </section>
                <Adress cep={data && data.vcep}/>
            </section>
            

            <section className='mt-10'>
              <h1>Cursos as unidades</h1>
            </section>  
            <section className='w-full mt-3 flex flex-row gap-10'> 
            {cursos.map(course => (
            <Card
              key={course.id}
              link={`/pages/curso/${course.id}`}
              src={course.imagem}
              handleDelete={""}
            />
          ))}</section>
          </div>
          
        </div>
        <div className='md:pt-5 pt-32'>
          <h1 className='text-sm pb-8'>Sobre a Unidade</h1>
          <p className='w-11/12'>{data && renderParagraphsWithIndentation(data.informacoes)}</p>
        </div>
      </div>
    </div>
  )
}

export default Page;
