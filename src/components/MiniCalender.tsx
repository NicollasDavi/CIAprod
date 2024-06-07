import Link from 'next/link';
import React from 'react';

const MiniCalender = () => {
  const date = new Date();
  const diaNumero = date.getDay(); 
  const diaMes = date.getDate();

  return (
    <div className="relative">
      <ul className='flex list-none gap-3 h-[40px] md:h-[80px] px-5 py-5 items-center rounded-lg bg-[#D9D9D9]'>
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((dia, index) => (
          <li
            key={index}
            className={`w-[35px] md:w-[80px] h-[35px] md:h-[70px] items-center justify-center flex rounded-lg md:rounded-3xl text-sm md:text-xl relative ${
              index === diaNumero ? 'bg-[#3B82F6] text-white top-[-20px] font-bold' : 'bg-[#D9D9D9]'
            }`}
          >
            <div >
              {dia}
              {index === diaNumero && (
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 text-black text-sm font-bold">{diaMes}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCalender;
