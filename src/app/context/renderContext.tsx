"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Props {
  token: string;
  setToken: (value: string) => void;
  admin: boolean;
  setAdmin: (value: boolean) => void;
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
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenLocal = await localStorage.getItem('token');
      const isAdmin = localStorage.getItem('admin');

      if (tokenLocal) {
        setToken(tokenLocal);
        setAdmin(isAdmin === 'true');
      } else {
        window.location.replace('/');
      }
    };

    fetchToken();
  }, []);

  return (
    <renderContext.Provider value={{ token, setToken, admin, setAdmin }}>
      {token ? children : "VOCÊ NÃO TEM TOKEN, SAFADO"}
    </renderContext.Provider>
  );
};
