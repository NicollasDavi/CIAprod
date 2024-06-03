"use client"
import React, { useState, useEffect } from 'react';
import ListBar from '@/src/components/adm/ListBar';
import axiosInstance from '../../axiosInstance';
import { useRenderContext } from '../../../app/context/renderContext';
import { useRouter } from 'next/navigation'

interface Unidade {
  codigo: string;
  nome: string;
  createdAt: any;
  vcep: any;
  active: boolean;
}

interface Curso {
  id: string;
  nome: string;
  createdAt: any;
  unidade: string;
  turno: string;
  active: boolean;
}

interface Valores {
  id: string;
  nome: string;
  createdAt: any;
  unidade: string;
  turno: string;
  active: boolean;
}


const Page = () => {
  const { admin } = useRenderContext();
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [valores, setValores] = useState<Valores[]>([]);
  const router = useRouter()
  useEffect(() => {
    axiosInstance.get('/all/unidades')
      .then(response => {
        setUnidades(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar unidades:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/all/cursos')
      .then(response => {
        setCursos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar cursos:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/all/valores')
      .then(response => {
        setValores(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar valores:', error);
      });
  }, []);

  const handleUnidadeDelete = (codigo: string) => {
    setUnidades(unidades.filter(unidade => unidade.codigo !== codigo));
  };

  const handleUnidadeStatusChange = (codigo: string, newStatus: boolean) => {
    setUnidades(unidades.map(unidade => 
      unidade.codigo === codigo ? { ...unidade, active: newStatus } : unidade
    ));
  };

  const handleCursoDelete = (id: string) => {
    setCursos(cursos.filter(curso => curso.id !== id));
  };

  const handleCursoStatusChange = (id: string, newStatus: boolean) => {
    setCursos(cursos.map(curso => 
      curso.id === id ? { ...curso, active: newStatus } : curso
    ));
  };

  const handleValorDelete = (id: string) => {
    setValores(valores.filter(valor => valor.id !== id));
  };

  const handleValorStatusChange = (id: string, newStatus: boolean) => {
    setValores(valores.map(valor => 
      valor.id === id ? { ...valor, active: newStatus } : valor
    ));
  };

  return (
    <div className='pt-8 w-screen'>
      {admin && (
        <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
          <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Data List</h1>
          <div className='w-10/12'>
            <div className='pt-10'>
              <h2>Unidade</h2>
              <section>
                <hr />
                {unidades.map(unidade => (
                  <ListBar
                    key={unidade.codigo}
                    nome={unidade.nome}
                    date={unidade.createdAt}
                    data1={unidade.vcep}
                    data2=""
                    criadoPor="Nicollas"
                    route={`unidade/${unidade.codigo}`}
                    active={unidade.active}
                    routeDisable={`unidade/${unidade.codigo}`}
                    onDelete={() => handleUnidadeDelete(unidade.codigo)}
                    onStatusChange={(newStatus) => handleUnidadeStatusChange(unidade.codigo, newStatus)}
                  />
                ))}
              </section>
            </div>
            <div className='pt-10'>
              <h2>Cursos</h2>
              <section>
                <hr />
                {cursos.map(curso => (
                  <ListBar
                    active={curso.active}
                    key={curso.id}
                    nome={curso.nome}
                    date={curso.createdAt}
                    criadoPor="Nicollas"
                    data1={curso.unidade}
                    data2={curso.turno}
                    route={`curso/delete/${curso.id}`}
                    routeDisable={`curso/${curso.id}`}
                    onDelete={() => handleCursoDelete(curso.id)}
                    onStatusChange={(newStatus) => handleCursoStatusChange(curso.id, newStatus)}
                  />
                ))}
              </section>
            </div>
            <div className='pt-10'>
              <h2>Valores</h2>
              <section>
                <hr />
                {valores.map(valor => (
                  <ListBar
                    active={valor.active}
                    key={valor.id}
                    nome={valor.nome}
                    criadoPor="Nicollas"
                    data1={valor.unidade}
                    data2={valor.turno}
                    date={valor.createdAt}
                    route={`valor/${valor.id}`}
                    routeDisable={`valor/${valor.id}`}
                    onDelete={() => handleValorDelete(valor.id)}
                    onStatusChange={(newStatus) => handleValorStatusChange(valor.id, newStatus)}
                  />
                ))}
              </section>
            </div>
          </div>
          <div className='w-2/12 p-3 absolute bottom-0 right-0 flex flex-col'>
            <button onClick={() => router.push('/pages/infos/add/unidade')} className='bg-blue1 p-2 mb-4 rounded-xl text-white'>Adicionar Unidade</button>
            <button onClick={() => router.push('/pages/cursocreate')} className='bg-blue1 p-2 mb-4 rounded-xl text-white'>Adicionar Curso</button>
            <button onClick={() => router.push('/pages/calculadora/add')} className='bg-blue1 p-2 mb-4 rounded-xl text-white'>Adicionar Valor</button>
            <button onClick={() => router.push('/pages/professores/add')} className='bg-blue1 p-2 mb-4 rounded-xl text-white'>Adicionar Unidade</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;