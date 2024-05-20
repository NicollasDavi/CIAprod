"use client"
import React, { useState, useEffect } from 'react';
import ListBar from '@/src/components/adm/ListBar';
import axiosInstance from '../../axiosInstance';
import { useRenderContext } from '../../../app/context/renderContext';

interface Unidade {
  id: string;
  nome: string;
  createdAt: any;
  vcep: any;
}

interface Curso {
  id: string;
  nome: string;
  createdAt: any;
  unidade: string;
  turno: string;
}

interface Valores {
  id: string;
  nome: string;
  createdAt: any;
  unidade: string;
  turno: string;
}

const Page = () => {
  const { admin } = useRenderContext();
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [valores, setValores] = useState<Valores[]>([]);

  useEffect(() => {
    axiosInstance.get('/unidades')
      .then(response => {
        setUnidades(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar unidades:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/cursos')
      .then(response => {
        setCursos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar cursos:', error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get('/valores')
      .then(response => {
        setValores(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar valores:', error);
      });
  }, []);

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
                    key={unidade.id}
                    nome={unidade.nome}
                    date={unidade.createdAt}
                    data1={unidade.vcep}
                    data2=""
                    criadoPor="Nicollas"
                    route={`unidade/${unidade.id}`}
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
                    key={curso.id}
                    nome={curso.nome}
                    date={curso.createdAt}
                    criadoPor="Nicollas"
                    data1={curso.unidade}
                    data2={curso.turno}
                    route={`curso/delete/${curso.id}`}
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
                    key={valor.id}
                    nome={valor.nome}
                    criadoPor="Nicollas"
                    data1={valor.unidade}
                    data2={valor.turno}
                    date={valor.createdAt}
                    route={`valor/${valor.id}`}
                  />
                ))}
              </section>
            </div>
          </div>
          <div className='w-4/12 bg-blue-500 absolute top-0 right-0'>
            <h1>opa</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
