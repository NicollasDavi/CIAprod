/* eslint-disable */

"use client"
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';

interface PegarDiaProps {
    handleResult: (date: Date | undefined) => void;
  }

const PegarDia: React.FC<PegarDiaProps> = (props) => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [timeValue, setTimeValue] = useState<string>('00:00');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimeValue(e.target.value);
  };

  const handleDaySelect = (date: Date | undefined) => {
    setSelected(date);
    setErrorMessage('');

    if (!date) {
      setErrorMessage('Nenhuma data selecionada');
      return;
    }

    const [hours, minutes] = timeValue.split(':').map((str) => parseInt(str, 10));
    if (isNaN(hours) || isNaN(minutes)) {
      setErrorMessage('Hora inválida');
      return;
    }

    props.handleResult(date);
  };

  return (
    <>
      <div>
        <p className='ml-4 text-white'>
          Selecione a hora:{' '}
          <input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className='bg-white text-black rounded-xl p-1 ml-5'
          />
        </p>
      </div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDaySelect}
        className='bg-[#3B82F6] text-white'
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
}

export default PegarDia;
