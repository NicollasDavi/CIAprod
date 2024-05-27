import React from 'react';
import { FaCopy } from 'react-icons/fa';

interface CalcResultProps {
  curso: string;
  unidade: string;
  turno: string;
  parcelamento: number;
  mensalidade: any;
  aluno: string;
}

const CalcResult: React.FC<CalcResultProps> = ({
  curso,
  unidade,
  turno,
  parcelamento,
  mensalidade,
  aluno,
}) => {
  const handleCopyAll = () => {
    const content = `${curso} || ${unidade}\n${turno} : ${parcelamento}x de R$ ${mensalidade}\nValores com desconto para: ${aluno}`;
    navigator.clipboard.writeText(content);
    alert('Conteúdo copiado para a área de transferência!');
  };

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-xl p-4 mt-20'>
      <h1 className='text-xl font-bold'>{`${curso} || ${unidade}`}</h1>
      <h2>{`${turno} : ${parcelamento}x de R$ ${mensalidade}`}</h2>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 flex items-center'
        onClick={handleCopyAll}
      >
        <FaCopy className='mr-2' />
        Copiar Conteúdo
      </button>
      <br />
      <h1>{`Valores com desconto para: ${aluno}`}</h1>
    </div>
  );
};

export default CalcResult;
