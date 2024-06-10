import React, { useState } from 'react';
import { VscDebugConsole } from "react-icons/vsc";
import AreaBug from "@/src/components/buttons/AreaBug";

const BugButton = () => {
  const [showAreaBug, setShowAreaBug] = useState(false);

  const handleBugButtonClick = () => {
    setShowAreaBug(!showAreaBug);
  };

  return (
    <>
      <div
        className='text-2xl p-4 bg-blue1 rounded-full text-white fixed bottom-5 right-5 cursor-pointer'
        title="Relatar Bug"
        onClick={handleBugButtonClick}
      >
        <VscDebugConsole />
      </div>
      {showAreaBug && <AreaBug onClose={() => setShowAreaBug(false)} />}
    </>
  );
}

export default BugButton;
