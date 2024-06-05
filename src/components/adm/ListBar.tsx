// ListBar.tsx
import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';
import axiosInstance from '@/src/app/axiosInstance';
import { GiSightDisabled } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import ConfirmationModal from '@/src/components/ConfirmationModal';

interface ListBarProps {
  nome: string;
  date: Date;
  data1: any;
  data2: any;
  criadoPor: any;
  route: string;
  active: boolean;
  routeDisable: string;
  onDelete: () => void;
  onStatusChange: (newStatus: boolean) => void;
}

const ListBar: React.FC<ListBarProps> = ({
  nome,
  date,
  data1,
  data2,
  criadoPor,
  route,
  active,
  routeDisable,
  onDelete,
  onStatusChange
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

  const [message, setMessage] = useState<string>('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleDelete = () => {
    axiosInstance
      .delete(`/${route}`)
      .then(response => {
        if (response.data.COD === 200) {
          setMessage(response.data.MESSAGE);
          onDelete();
          console.log(message);
          setTimeout(() => {
            setMessage('');
          }, 4000);
        } else {
          onDelete();
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const handleDisable = () => {
    axiosInstance
      .patch(`/${routeDisable}/0`)
      .then(response => {
        onStatusChange(false);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const handleEnable = () => {
    axiosInstance
      .patch(`/${routeDisable}/1`)
      .then(response => {
        onStatusChange(true);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <>
      <div className="justify-around p-2 rounded-md shadow flex flex-row mt-3">
        <div className='flex flex-row w-10/12 justify-around'>
          <h1>{nome}</h1>
          <h1>{data1}</h1>
          <h1>{data2}</h1>
          <h1 className='hidden md:block'>Criado por: {criadoPor}</h1>
          <h1 className='hidden md:block'>Criado em: {formatDate(new Date(date))}</h1>
          <h1 className='md:hidden'>{formatDate(new Date(date))}</h1>
        </div>
        <div className='flex flex-row w-2/12 justify-around'>
          <button className="p-1 rounded-lg bg-blue-500 ml-10 text-white mr-3 text-lg">
            <BiSolidEdit />
          </button>
          {!active ? (
            <>
              <button
                className="p-1 rounded-lg bg-red-500 text-white mr-3"
                onClick={() => setIsConfirmationModalOpen(true)}
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
          ) : (
            <button
              className="p-1 rounded-lg bg-blue-500 text-white mr-3"
              onClick={handleDisable}
            >
              <FaEye />
            </button>
          )}
        </div>
        {message && (
          <div>
            <p className="text-red-500 absolute">{message}</p>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={() => {
          handleDelete();
          setIsConfirmationModalOpen(false);
        }}
      />
    </>
  );
};

export default ListBar;
