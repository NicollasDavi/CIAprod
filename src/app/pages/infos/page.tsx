"use client"
import axiosInstance from '../../../app/axiosInstance';
import Card from '../../../components/Card';
import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  imagem: string;
}

interface Unidade {
  codigo: string;
  imagem: string;
}

const Page = () => {
  const [data, setData] = useState<Course[]>([]);
  const [unidade, setUnidades] = useState<Unidade[]>([]);


  const handleDelete = (id: string) => {
    axiosInstance.delete(`/curso/delete/${id}`)
      .then(response => {
        console.log(id)
        console.log(response);
        setData(prevData => prevData.filter(course => course.id !== id));
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  useEffect(() => {
    axiosInstance.get('/cursos')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/unidades')
      .then(response => {
        setUnidades(response.data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }, []);

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-3'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Unidades</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28 grid grid-cols-2 md:grid-cols-6'>
        {unidade.map(unidade => (
          <Card
            key={unidade.codigo}
            link={`/pages/unidade/${unidade.codigo}`}
            src={unidade.imagem}
            handleDelete={() => handleDelete(unidade.codigo)}
          />
        ))}
      </div>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-3'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-3'>Cursos</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28 grid grid-cols-2 md:grid-cols-6'>
        {data.map(course => (
          <Card
            key={course.id}
            link={`/pages/curso/${course.id}`}
            src={course.imagem}
            handleDelete={() => handleDelete(course.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
