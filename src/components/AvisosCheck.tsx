"use client"
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../src/app/axiosInstance';
import Notification from '../components/Notifications/Notification';

const AvisosCheck = () => {
  const [selectedType, setSelectedType] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [avisos, setAvisos] = useState<any[]>([]);

  const fectAvisos = () => {
    axiosInstance.get("/alerts").then(response => {
      const uniqueAlerts = response.data.filter((alert: any, index: number, self: any[]) => {
        return index === self.findIndex((a: any) => (
          a.id === alert.id
        ));
      });
      setAvisos(uniqueAlerts);
    }).catch(error => {
      console.error("Erro ao obter os avisos:", error);
    });
  };

  useEffect(() => {
    fectAvisos();
  }, []);

  const handleTypeChange = (value: string) => {
    if (selectedType === value) {
      setSelectedType("");
      setType("");
    } else {
      setSelectedType(value);
      setType(value);
    }
  };

  const onFecth = () => {
    fectAvisos();
  };

  const handleEnvAlert = async () => {
    const alert = {
      title,
      text,
      type,
    };
    await axiosInstance.post("/alert", alert).then(() => {
      onFecth();
    }).catch(error => {
      console.error("Erro ao enviar alerta:", error);
    });
  };

  return (
    <div className="w-full p-4 shadow mt-4 bg-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">Lançar Aviso</h1>
      <div className="flex flex-col md:flex-row">
        <section className="w-full md:w-6/12 bg-gray-100 p-4 rounded-lg">
          {avisos.map((aviso, index) => (
            <section className='mb-2' key={index}>
              <Notification
                type={aviso.type}
                title={aviso.title}
                text={aviso.text}
                adm={true}
                id={aviso.id}
                onFecth={onFecth}
              />
            </section>
          ))}
        </section>
        <section className="w-full md:w-6/12 flex flex-col p-4 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Título"
            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Conteúdo"
            rows={3}
            className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="flex flex-col space-y-2">
            <section className='flex flex-row justify-around'>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="A"
                  id="alert1"
                  className="h-5 w-5 focus:ring-0"
                  style={{ accentColor: 'yellow' }}
                  onChange={() => handleTypeChange('A')}
                  checked={selectedType === 'A'}
                />
                <label
                  htmlFor="alert1"
                  className={`ml-2 text-yellow-600`}
                >
                  Alerta
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="D"
                  id="alert2"
                  className="h-5 w-5 focus:ring-0"
                  style={{ accentColor: 'red' }}
                  onChange={() => handleTypeChange('D')}
                  checked={selectedType === 'D'}
                />
                <label
                  htmlFor="alert2"
                  className={`ml-2 text-red-600`}
                >
                  Negativo
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="S"
                  id="alert3"
                  className="h-5 w-5 focus:ring-0"
                  style={{ accentColor: 'green' }}
                  onChange={() => handleTypeChange('S')}
                  checked={selectedType === 'S'}
                />
                <label
                  htmlFor="alert3"
                  className={`ml-2 text-green-600`}
                >
                  Sucesso
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value="E"
                  id="alert4"
                  className="h-5 w-5 focus:ring-0"
                  style={{ accentColor: 'purple' }}
                  onChange={() => handleTypeChange('E')}
                  checked={selectedType === 'E'}
                />
                <label
                  htmlFor="alert4"
                  className={`ml-2 text-purple-600`}
                >
                  Evento
                </label>
              </div>
            </section>
          </div>
          <button
            onClick={handleEnvAlert}
            className="w-full md:w-3/12 text-white shadow bg-blue-500 hover:bg-blue-600 rounded-xl px-4 py-2 transition duration-200 m-auto mt-5"
          >
            Lançar
          </button>
        </section>
      </div>
    </div>
  );
};

export default AvisosCheck;
