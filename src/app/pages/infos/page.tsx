"use client"
import axiosInstance from '../../../app/axiosInstance';
import CourseCard from '../../../components/CourseCard';
import PlusIcon from '../../../components/PlusIcon';
import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  imagem: string;
}

const Page = () => {

  const [data, setData] = useState<Course[]>([]);

  const handleDelete = (id: string) => {
    axiosInstance.delete(`/curso/delete/${id}`)
      .then(response => {
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

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Cursos</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28 grid grid-cols-2 md:grid-cols-4'>
        {data.map(course => (
          <CourseCard
            key={course.id}
            link={`/pages/curso/${course.id}`}
            src={course.imagem}
            handleDelete={() => handleDelete(course.id)}
          />
        ))}
      </div>
      <PlusIcon link='/pages/cursocreate' />

    </div>
  );
}

export default Page;
