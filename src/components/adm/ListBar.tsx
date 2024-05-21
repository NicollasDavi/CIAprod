import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';
import axiosInstance from '@/src/app/axiosInstance';
import { GiSightDisabled } from "react-icons/gi";
import { FaEye } from "react-icons/fa";


const ListBar = ({
  nome,
  date,
  data1,
  data2,
  criadoPor,
  route,
  active,
  routeDisable
}: {
  nome: string;
  date: Date;
  data1: any;
  data2: any;
  criadoPor: any;
  route: string;
  routeDisable: string;
  active:boolean;
}) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`/${route}`)
      .then(response => {
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const handleDisable = () => {
    axiosInstance
      .patch(`/${routeDisable}/0`)
      .then(response => {
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const handleEnable = () => {
    axiosInstance
      .patch(`/${routeDisable}/1`)
      .then(response => {
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <div className="justify-around p-2 rounded-md shadow flex flex-row mt-3">
      <h1>{nome}</h1>
      <h1>{data1}</h1>
      <h1>{data2}</h1>
      <h1 className='hidden md:block'>Criado por: {criadoPor}</h1>
      <h1 className='hidden md:block'>Criado por: {criadoPor}</h1>
      <h1 className='hidden md:block'>Criado em: {formatDate(new Date(date))}</h1>
      <h1 className=' md:hidden'>{formatDate(new Date(date))}</h1>
      <button className="p-1 rounded-lg bg-blue-500 ml-10 text-white mr-3 text-lg">
        <BiSolidEdit />
      </button>
      {!active ? <>
        <button
        className="p-1 rounded-lg bg-red-500 text-white mr-3"
        onClick={handleDelete}
      >
        <MdDeleteForever />
      </button>
      <button
        className="p-1 rounded-lg bg-red-500 text-white mr-3"
        onClick={handleEnable}
      >
        <GiSightDisabled />
      </button>
      
      </>
      : 
      <button
        className="p-1 rounded-lg bg-blue-500 text-white mr-3"
        onClick={handleDisable}
      >
        <FaEye />
      </button>}
        
      
    </div>
  );
};

export default ListBar;
