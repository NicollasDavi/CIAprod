"use client"
import PlusIcon from '@/src/components/PlusIcon';
import axiosInstance from '../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [id, setID] = useState('');
  const [unidade, setUnidade] = useState('');
  const [turno, setTurno] = useState('');
  const [parce, setParce] = useState('');
  const [desconto, setDesconto] = useState('');
  const [mensalidade, setMensalidade] = useState()
  const [escola, setEscola] = useState();
  const [material, setMaterial] = useState();

  useEffect(() => {
    axiosInstance.get('/valores')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }, []);

  interface Curso{
    id: string,
    nome: string,
  }

  const handleCalculate = () => {
    const calc = {
      id: id,
      unidade: unidade,
      turno: turno,
      parcelamento: parce,
      desconto: desconto
    };

    axiosInstance.post('/calc', calc)
      .then(response => {
        setMensalidade(response.data.mensalidade)
        setEscola(response.data.valorEscola)
        setMaterial(response.data.valorMaterial)
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-8'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Calculadora</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10'>
          <select value={id} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setID(e.target.value)}>
            <option value="">Selecione um curso</option>
            {data.map((course: Curso) => (
              <option key={course.id} value={course.id}>{course.nome}</option>
            ))}
          </select>

          <select value={turno} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setTurno(e.target.value)}>
            <option value="">Selecione um turno</option>
            <option value="Manha">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>

          <input type="text" placeholder="Desconto" value={desconto} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setDesconto(e.target.value)} />

          <select value={unidade} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setUnidade(e.target.value)}>
            <option value="">Selecione uma unidade</option>
            <option value="VM">VM</option>
            <option value="HV">HV</option>
            <option value="BV">BV</option>
            <option value="PG">PG</option>
            <option value="JV">JV</option>
          </select>

          <input type="text" placeholder="Parcelamento" value={parce} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setParce(e.target.value)} />
        </div>
      </div>
      {data.length > 0 && (
  <div className='md:flex md:flex-row w-11/12 md:w-9/12 m-auto h-auto mb-10'>
    <div className='md:w-6/12 ml-10'>
      <h1 className='font-bold'>
        {data.find((course: Curso) => course.id === id)?.nome} {turno} em {parce} com {desconto} de desconto
      </h1>
      <p className='pt-5'>{parce} de {mensalidade}</p>
      <p className='pt-5'>escola: {escola}</p>
      <p className='pt-5'>material: {material}</p>
    </div>
    <div className='md:w-6/12 ml-10 pt-10 md:pt-0'>
      <h1 className='font-bold'>
        {data.find(course => course.id === id)?.nome} {turno} em {parce} sem desconto
      </h1>
      <p className='pt-5'>{parce} de {mensalidade}</p>
      <p className='pt-5'>escola: {escola}</p>
      <p className='pt-5'>material: {material}</p>
    </div>
  </div>
)}
      <div className='w-12/12 md:w-12/12 m-auto h-auto mb-10 md:mt-40 flex'>
        <button className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg' onClick={handleCalculate}>Calcular</button>
      </div>
      <PlusIcon link='/pages/calculadora/add' />

    </div>
  );
};

export default Page;
