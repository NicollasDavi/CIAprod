"use client"
import axiosInstance from '../../../app/axiosInstance'
import CourseCard from '../../../components/Card'
import DocCard from '../../../components/DocCard'
import PlusIcon from '../../../components/PlusIcon'
import React, { useEffect, useState } from 'react'
import { useRenderContext } from '../../context/renderContext'
const teste = "/pages/doc"

interface DocData {
  id: number;
  nome: string;
  publica: boolean;
  userId: number;
}



const Page = () => {
  const { matricula, ...otherProps } = useRenderContext();

  const [data, setData] = useState<DocData[]>([]);

  useEffect(() => {
    axiosInstance.get(`/docs/${matricula}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao recuperar documentos:', error);
      });
  }, []);
  
  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Docs</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28 grid grid-cols-2 md:grid-cols-4'>
      {data && data.map(doc => (
        <DocCard key={doc.id} nome={doc.nome} id={doc.id}/>
      ))}
      </div>
      <PlusIcon link={teste} />
    </div>
  );
};

export default Page;
