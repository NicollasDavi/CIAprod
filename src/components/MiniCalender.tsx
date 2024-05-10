import Link from 'next/link';
import React from 'react';

const MiniCalender = () => {
  const date = new Date();
  const diaNumero = date.getDay(); 
  const diaMes = date.getDate();
  const mes = date.toLocaleString('default', { month: 'long' }); 
  const ano = date.getFullYear();

  return (
    <div className="relative">
      <ul className='flex list-none gap-3 h-[50px] md:h-[90px] px-5 py-5 items-center rounded-lg bg-[#D9D9D9]'>
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((dia, index) => (
          <li
            key={index}
            className={`w-[35px] md:w-[80px] h-[35px] md:h-[80px] items-center justify-center flex rounded-lg md:rounded-3xl text-sm md:text-xl relative cursor-pointer ${
              index === diaNumero ? 'bg-[#3B82F6] text-white top-[-20px] font-bold' : 'bg-[#D9D9D9]'
            }`}
          >
            <Link href="/pages/calendario">
              {dia}
              {index === diaNumero && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-black text-sm font-bold">{diaMes}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCalender;
