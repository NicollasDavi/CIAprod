import React, { useState } from 'react';
import { FaBug } from "react-icons/fa";
import { HiMiniRocketLaunch } from "react-icons/hi2";

interface AreaBugProps {
  onClose: () => void;
}

const AreaBug: React.FC<AreaBugProps> = ({ onClose }) => {
  const [showBugForm, setShowBugForm] = useState(false);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);

  const handleBugButtonClick = () => {
    setShowBugForm(true);
    setShowSuggestionForm(false);
  };

  const handleSuggestionButtonClick = () => {
    setShowSuggestionForm(true);
    setShowBugForm(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <div className='fixed bottom-20 right-16 w-2/12 shadow-blue1 shadow-lg rounded-lg'>
      <div className='p-2 rounded-lg border'>
        {showBugForm && (
          <form onSubmit={handleSubmit}>
            <h3>Area de Bug</h3>
            <textarea className='border border-blue1 rounded-lg p-2 w-full mt-2 max-h-36' placeholder="Descreva o bug" />
            <button type="submit" className='bg-blue1 text-white p-2 rounded-lg mt-2 w-full'>Enviar</button>
          </form>
        )}
        {showSuggestionForm && (
          <form onSubmit={handleSubmit}>
            <h3>Area de Sugestão</h3>
            <textarea className='border border-blue1 rounded-lg p-2 w-full mt-2 max-h-36' placeholder="Descreva a sugestão" />
            <button type="submit" className='bg-blue1 text-white p-2 rounded-lg mt-2 w-full'>Enviar</button>
          </form>
        )}
        <div className='mt-2 flex flex-row gap-10 w-full justify-around'>
          <button onClick={handleBugButtonClick} className='bg-blue1 text-white flex flex-col items-center p-3 rounded-xl w-6/12'>
            <FaBug className='text-xl'/>
          </button>
          <button onClick={handleSuggestionButtonClick} className='bg-blue1 text-white flex flex-col items-center p-3 rounded-xl w-6/12'>
            <HiMiniRocketLaunch className='text-xl'/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AreaBug;
