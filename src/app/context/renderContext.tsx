"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Props {
  token: string;
  setToken: (value: string) => void;
}

const renderContext = createContext<Props | undefined>(undefined);

export const useRenderContext = () => {
  const context = useContext(renderContext);
  if (!context) {
    throw new Error('useRenderContext deve ser usado dentro de um provedor RenderProvider');
  }
  return context;
};

export const RenderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const tokenLocal = await localStorage.getItem('token');
      if (tokenLocal) {
        await setToken(tokenLocal);
      } else {
        window.location.replace('/');
      }
    };

    fetchToken();
  }, []);

  return (
    <renderContext.Provider value={{ token, setToken }}>
      {token? children : "VOCE N TEM TOKEN SAFADO"}
    </renderContext.Provider>
  );
};
