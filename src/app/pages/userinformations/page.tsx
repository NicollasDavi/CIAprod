"use client"
import React, { useState, useEffect } from 'react';
import { AiOutlineIdcard, AiOutlineMail } from 'react-icons/ai';
import { Camera } from 'react-feather';
import axiosInstance from '../../axiosInstance';

const Page = () => {
  const [newFoto, setNewFoto] = useState<string | ArrayBuffer | null>(null);
  const [user, setUser] = useState({
    nome: '',
    matricula: '',
    email: '',
    foto: '',
    cargo: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matriculaLocal = localStorage.getItem('matricula') ?? '';
        const response = await axiosInstance.get(`/user/${matriculaLocal}`);
        const foundUser = response.data.findedUser;

        setUser({
          nome: foundUser.nome,
          matricula: matriculaLocal,
          email: foundUser.email || '',
          foto: foundUser.foto || '',
          cargo: foundUser.cargo || '',
        });
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  useEffect(() => {
    if (newFoto) {
      const updatePhoto = async () => {
        try {
          const matriculaLocal = localStorage.getItem('matricula') ?? '';
          const response = await axiosInstance.patch(`/user/${matriculaLocal}`, { foto: newFoto });
          setUser((prevUser) => ({
            ...prevUser,
            foto: newFoto as string,
          }));
        } catch (error) {
          console.error('Erro ao atualizar a foto do usuário:', error);
        }
      };

      updatePhoto();
    }
  }, [newFoto]);

  const handleEmailBlur = async () => {
    try {
      const matriculaLocal = localStorage.getItem('matricula') ?? '';
      await axiosInstance.patch(`/user/${matriculaLocal}`, { email: user.email });
    } catch (error) {
      console.error('Erro ao atualizar o email do usuário:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-10/12 shadow-lg bg-white p-8 rounded-lg flex items-center ml-32'>
        <div className='w-3/6 h-[50vh] ml-8 relative'>
          {user.foto ? (
            <img
              src={user.foto}
              alt={user.nome}
              className="w-full h-full rounded-full object-cover shadow-lg transition duration-500 ease-in-out transform hover:scale-105"
            />
          ) : (
            <>
              <label htmlFor="file-input" className="w-full h-full rounded-full absolute bg-gray-500 flex justify-center items-center cursor-pointer">
                <Camera className="text-white w-4/12 h-[30vh]" />
              </label>
              <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
            </>
          )}
        </div>
        <div className='w-full pl-32'>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4">Informações do Usuário</h2>
            <div className="mb-4 flex items-center">
              <div>
                <p className="font-bold text-lg">{user.nome}</p>
                <p className="text-gray-600">{user.cargo}</p>
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <AiOutlineIdcard className="text-gray-600 mr-2" />
              <div>
                <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="matricula">Matrícula:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                  id="matricula"
                  type="text"
                  name="matricula"
                  value={user.matricula}
                  readOnly
                />
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <AiOutlineMail className="text-gray-600 mr-2" />
              <div>
                <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="email">Email:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                  id="email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder={user.email ? undefined : 'Digite seu email'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
