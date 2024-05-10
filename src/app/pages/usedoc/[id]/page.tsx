"use client"
import axiosInstance from '../../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const id = window.location.pathname.split('/').pop();
  const [doc, setDoc] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              if (id) {
                  const response = await axiosInstance.get(`/doc/${id}`);
                  console.log('Dados recebidos da API:', response.data.docTypes);
                  setDoc(response.data.docTypes);
                  setLoading(false);
              }
          } catch (error) {
              console.error('Erro ao obter dados da API:', error);
              setLoading(false);
          }
      };

      fetchData();
  }, [id]);

  return (
      <div className='pt-8'>
          <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
              <section className='mt-16 items-end mb-16 text-2xl'>
                  <h1>Nome</h1>
              </section>
              {loading ? (
                  <div>Carregando...</div>
              ) : (
                  doc.map(docItem => (
                      <div key={docItem.id} className='p-2 flex flex-row gap-2'>
                          {docItem.type === 1 ? (
                              <section className='w-12/12'>
                                  <p>{docItem.text}</p>
                              </section>
                          ) : ""}
                          {docItem.type === 2 ?(
                              <div className='flex flex-row gap-2 w-full'>
                                  <section className='w-6/12'>
                                      <p>{docItem.text}</p>
                                  </section>
                                  <section className='w-6/12'>
                                      <img src={docItem.img} alt="Imagem escolhida" className='h-auto max-h-[500px] rounded-xl m-auto'/>
                                  </section>
                              </div>
                          ) : ""}
                          {docItem.type === 3 ? (
                                <div className='flex flex-row gap-2 w-full'>
                                    <section className='w-6/12 '>
                                        <img src={docItem.img} alt="Imagem escolhida" className=' h-auto max-h-[500px] rounded-xl m-auto'/>
                                    </section>
                                    <section className='w-6/12 '>
                                      <p >{docItem.text}</p>
                                    </section>
                                </div>
                            ) : "" }
                          {docItem.type === 4 ? (
                              <div className='flex flex-row gap-2 w-full'>
                                  <img src={docItem.img} alt="Imagem escolhida" className='bg-white h-auto max-h-[500px] rounded-xl m-auto'/>
                              </div>
                          ) : ""}
                          <hr className='mt-2'/>
                      </div>
                  ))
              )}
              <hr />
          </div>
      </div>
  );
};

export default Page;
