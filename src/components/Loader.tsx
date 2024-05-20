import React from 'react';

const Loader = () => {
  return (
    <main className="flex justify-center items-center h-screen bg-blue1 text-fg transition-colors duration-300">
      <svg className="ip w-64 h-32" viewBox="0 0 256 128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="33%" stopColor="#60A5FA" />
            <stop offset="67%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="33%" stopColor="#1E40AF" />
            <stop offset="67%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <g fill="none" strokeLinecap="round" strokeWidth="16">
          <g className="ip__track stroke-default-300 transition-colors duration-300">
            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
          </g>
          <g strokeDasharray="180 656">
            <path className="ip__worm1 animate-worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
            <path className="ip__worm2 animate-worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
          </g>
        </g>
      </svg>
    </main>
  );
};

export default Loader;
