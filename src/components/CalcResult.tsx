import React from 'react';
import { FaCopy } from 'react-icons/fa';

interface CalcResultProps {
  curso: string;
  unidade: string;
  turno: string;
  parcelamento: number;
  mensalidade: any;
  aluno: string;
  desconto: any;
  turnoManha: string;
  turnoTarde: string;
  turnoNoite: string;
  turnoOnline: string;
  mensalidadeManha: any;
  mensalidadeTarde: any;
  mensalidadeNoite: any;
  mensalidadeOnline: any;
  mensalidadeManhaDesconto: any;
  mensalidadeTardeDesconto: any;
  mensalidadeNoiteDesconto: any;
  mensalidadeOnlineDesconto: any;
}

const CalcResult: React.FC<CalcResultProps> = ({
  curso,
  unidade,
  turno,
  parcelamento,
  mensalidade,
  aluno,
  desconto,
  turnoManha,
  turnoTarde,
  turnoNoite,
  turnoOnline,
  mensalidadeManha,
  mensalidadeTarde,
  mensalidadeNoite,
  mensalidadeOnline,
  mensalidadeManhaDesconto,
  mensalidadeTardeDesconto,
  mensalidadeNoiteDesconto,
  mensalidadeOnlineDesconto,
}) => {
  const handleCopyAll: any = () => {
    const content = `${curso} || ${unidade}\n${turno} : ${parcelamento}x de R$ ${mensalidade}\nValores com desconto para: ${aluno}`;
    navigator.clipboard.writeText(content);
    alert('Conteúdo copiado para a área de transferência!');
  };

  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-xl p-4 mt-20'>
      <h1 className='text-xl font-bold'>{`${curso} || ${unidade} em ${parcelamento}`}</h1>
        {mensalidadeManha && <h2>{`${turnoManha} : ${parcelamento}x de R$ ${mensalidadeManha}`}</h2>}
        {mensalidadeTarde && <h2>{`${turnoTarde} : ${parcelamento}x de R$ ${mensalidadeTarde}`}</h2>}
        {mensalidadeNoite && <h2>{`${turnoNoite} : ${parcelamento}x de R$ ${mensalidadeNoite}`}</h2>}
        {mensalidadeOnline && <h2>{`${turnoOnline} : ${parcelamento}x de R$ ${mensalidadeOnline}`}</h2>}
      <br />
      {desconto > 0 && (
        <div>
          <h1>{`Valores com desconto para: ${aluno}`}</h1>
          {turnoManha && <h2>{`${turnoManha} : ${parcelamento}x de R$ ${mensalidadeManhaDesconto}`}</h2>}
          {turnoTarde && <h2>{`${turnoTarde} : ${parcelamento}x de R$ ${mensalidadeTardeDesconto}`}</h2>}
          {turnoNoite && <h2>{`${turnoNoite} : ${parcelamento}x de R$ ${mensalidadeNoiteDesconto}`}</h2>}
          {turnoOnline && <h2>{`${turnoOnline} : ${parcelamento}x de R$ ${mensalidadeOnlineDesconto}`}</h2>}
        </div>
      )}
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 flex items-center'
        onClick={handleCopyAll}
      >
        <FaCopy className='mr-2' />
        Copiar Conteúdo
      </button>
    </div>
  );
};

export default CalcResult;
