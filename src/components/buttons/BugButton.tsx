import React from 'react';
import { VscDebugConsole } from "react-icons/vsc";

interface BugButtonProps {
  onClick: () => void;
}

const BugButton: React.FC<BugButtonProps> = ({ onClick }) => {
  return (
    <div
      className='text-2xl p-4 bg-blue1 rounded-full text-white fixed bottom-5 right-5 cursor-pointer'
      title="Relatar Bug"
      onClick={onClick}
    >
      <VscDebugConsole />
    </div>
  );
}

export default BugButton;
