"use client";
import Loader from '@/src/components/Loader';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Props {
  token: string;
  setToken: (value: string) => void;
  admin: boolean;
  setAdmin: (value: boolean) => void;
  matricula: string;
  setMatricula: (value: string) => void;

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
  const [loading, setLoading] = useState(true);
  const [matricula, setMatricula] = useState('')

  useEffect(() => {
    const fetchToken = async () => {
      const tokenLocal = localStorage.getItem('token');
      const mat = localStorage.getItem('matricula');
      const isAdmin = localStorage.getItem('admin');

      if (tokenLocal) {
        setToken(tokenLocal);
        setAdmin(isAdmin === 'true');
        if (mat) {
          setMatricula(mat);
        }        
      } else {
        window.location.replace('/');
      }
      setLoading(false);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('popstate', handleStart);
    window.addEventListener('pushState', handleStart);
    window.addEventListener('replaceState', handleStart);

    window.addEventListener('load', handleComplete);
    window.addEventListener('popstate', handleComplete);
    window.addEventListener('pushState', handleComplete);
    window.addEventListener('replaceState', handleComplete);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('popstate', handleStart);
      window.removeEventListener('pushState', handleStart);
      window.removeEventListener('replaceState', handleStart);

      window.removeEventListener('load', handleComplete);
      window.removeEventListener('popstate', handleComplete);
      window.removeEventListener('pushState', handleComplete);
      window.removeEventListener('replaceState', handleComplete);
    };
  }, []);

  return (
    <renderContext.Provider value={{ token, setToken, admin, setAdmin, matricula, setMatricula }}>
      {loading ? <Loader /> : children}
    </renderContext.Provider>
  );
};
