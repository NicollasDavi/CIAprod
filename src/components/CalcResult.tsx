import React from 'react';
import { FaCopy } from 'react-icons/fa';

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

interface CalcResultProps {
  curso: string;
  unidade: string;
  turno: string;
  parcelamento: number;
  mensalidade: any;
  state: boolean
  dataLimite: Date;
  aluno: string;
  desconto: number;
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
  dataLimite,
  state
}) => {
  const handleCopyAll: any = () => {
    let content = `📚 ${curso} || 🏫 ${unidade} em ${parcelamento}x\n`;
    content += `Valores de: Escola 🏫+ Material 📖\n`;
    if (mensalidadeManha) content += `🌅 ${turnoManha} : ${parcelamento}x de R$ ${mensalidadeManha}\n`;
    if (mensalidadeTarde) content += `☀️ ${turnoTarde} : ${parcelamento}x de R$ ${mensalidadeTarde}\n`;
    if (mensalidadeNoite) content += `🌙 ${turnoNoite} : ${parcelamento}x de R$ ${mensalidadeNoite}\n`;
    if (mensalidadeOnline) content += `💻 ${turnoOnline} : ${parcelamento}x de R$ ${mensalidadeOnline}\n`;
  
    if (desconto > 0 && mensalidadeManha !== mensalidadeManhaDesconto || mensalidadeTarde !== mensalidadeTardeDesconto || mensalidadeNoite !== mensalidadeNoiteDesconto || mensalidadeOnline !== mensalidadeOnlineDesconto) {
      content += `\n🎉 Valores com desconto para: ${aluno}\n`;
      if (turnoManha) content += `🌅 ${turnoManha} : ${parcelamento}x de R$ ${mensalidadeManhaDesconto}\n`;
      if (turnoTarde) content += `☀️ ${turnoTarde} : ${parcelamento}x de R$ ${mensalidadeTardeDesconto}\n`;
      if (turnoNoite) content += `🌙 ${turnoNoite} : ${parcelamento}x de R$ ${mensalidadeNoiteDesconto}\n`;
      if (turnoOnline) content += `💻 ${turnoOnline} : ${parcelamento}x de R$ ${mensalidadeOnlineDesconto}\n\n`;
      content += `${formatDate(dataLimite)}`
    }
  
    navigator.clipboard.writeText(content);
    alert("Conteúdo copiado!");
  };

  return (
    <div className=''>
      {state
      ?
      <>
        <h1 className='text-xl font-extrabold'>{`📚 ${curso} || 🏫 ${unidade} em ${parcelamento}x`}</h1>
      <h1>{`Valores de: Escola 🏫+ Material 📖\n`}</h1>
        {mensalidadeManha && <h2>{`🌅 ${turnoManha} : ${parcelamento}x de R$ ${mensalidadeManha}`}</h2>}
        {mensalidadeTarde && <h2>{`☀️ ${turnoTarde} : ${parcelamento}x de R$ ${mensalidadeTarde}`}</h2>}
        {mensalidadeNoite && <h2>{`🌙 ${turnoNoite} : ${parcelamento}x de R$ ${mensalidadeNoite}`}</h2>}
        {mensalidadeOnline && <h2>{`💻 ${turnoOnline} : ${parcelamento}x de R$ ${mensalidadeOnline}`}</h2>}
      <br />
      {desconto > 0 && (
        <div>
          <h1>{`🎉 Valores com desconto para: ${aluno}`}</h1>
          {turnoManha && <h2>{`🌅 ${turnoManha} : ${parcelamento}x de R$ ${mensalidadeManhaDesconto}`}</h2>}
          {turnoTarde && <h2>{`☀️ ${turnoTarde} : ${parcelamento}x de R$ ${mensalidadeTardeDesconto}`}</h2>}
          {turnoNoite && <h2>{`🌙 ${turnoNoite} : ${parcelamento}x de R$ ${mensalidadeNoiteDesconto}`}</h2>}
          {turnoOnline && <h2>{`💻 ${turnoOnline} : ${parcelamento}x de R$ ${mensalidadeOnlineDesconto}`}</h2>}
          <br />
          <h1>Condição válida até {`${formatDate(dataLimite)}`}</h1>
        </div>
      )}
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 flex items-center m-auto'
        onClick={handleCopyAll}
      >
        <FaCopy className='mr-2' />
        Copiar Conteúdo
      </button>
      </>
      :  
      <>
        <h1 className='text-xl font-extrabold'>{`📚 ${curso} || 🏫 ${unidade} em ${parcelamento}x`}</h1>
        <br />
        <h1>{`O desconto dado foi: ${mensalidade}`}</h1>
      </>  
    }
      
    </div>
  );
};

export default CalcResult;
