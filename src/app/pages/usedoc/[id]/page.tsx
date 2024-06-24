"use client"
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useRenderContext } from '../../../context/renderContext';
import ConfirmationModal from "../../../../components/ConfirmationModal"
import PDFViewer from '@/src/components/pdf';


const Page = () => {
  const { matricula, ...otherProps } = useRenderContext();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const router = useRouter();
  const [paginaUserId, setPaginaUserId] = useState("")
  const id = window.location.pathname.split('/').pop();
  const [nome, setNome] = useState('')

  const [doc, setDoc] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [arq, setArq] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
            await axiosInstance.get(`/doc/${id}`).then(async (response : any) => {
            setDoc(response.data.docTypes);
            setPaginaUserId(response.data.userId)
            setNome(response.data.nome)
            console.log(response.data)
            setLoading(false);
            if(response.data.arqId != ''){
              const arqId = response.data.docTypes[0].arqId
              await axiosInstance.get(`/arq/${arqId}`).then((response) => {
                setArq(response.data.fileUrl)
                console.log(arq)
              })
            }
          });
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [arq, id]);

  const handleDelete = (id: any) => {
    setIsConfirmationModalOpen(false);
    axiosInstance.patch(`/doc/${id}/0`)
      .then(() => {
        router.push("/pages/docs");
      })
      .catch(error => {
        console.error('Erro ao deletar documento:', error);
      });
  }

  const renderParagraphsWithIndentation = (text: string) => {
    const paragraphs = text.split('\n');
    const indentedParagraphs = paragraphs.map((paragraph, index) => {
      if (index === 0 || !paragraph.trim()) {
        return paragraph;
      } else {
        return `    ${paragraph.trim()}`; 
      }
    });
    return indentedParagraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <section className='mt-16 items-end mb-16 text-2xl'>
          <h1>{nome}</h1>
        </section>
        {paginaUserId == matricula && arq != '' &&
        <section className='shadow mt-5 p-3 felx felx-row items-center rounded-xl'>
          <section>
            <button
            className="p-1 rounded-lg bg-red-500 ml-10 text-white mr-3 text-lg flex flex-row gap-5 items-center justify-around"
            onClick={() => setIsConfirmationModalOpen(true)}
          >
            <MdDeleteForever /> Deletar pagina
          </button>
            </section>
        </section>
        }
        {loading ? (
          <div>Carregando...</div>
        ) : (
          doc.map(docItem => (
            <div key={docItem.id} className='p-2 flex flex-row gap-2'>
              {docItem.type === 1 ? (
                <section className='w-12/12'>
                  <p>{renderParagraphsWithIndentation(docItem.text)}</p>
                </section>
              ) : null}
              {docItem.type === 2 ? (
                <div className='flex flex-row gap-2 w-full'>
                  <section className='w-6/12'>
                    <p>{renderParagraphsWithIndentation(docItem.text)}</p>
                  </section>
                  <section className='w-6/12'>
                    <img src={docItem.img} alt="Imagem escolhida" className='h-auto max-h-[500px] rounded-xl m-auto' />
                  </section>
                </div>
              ) : null}
              {docItem.type === 3 ? (
                <div className='flex flex-row gap-2 w-full'>
                  <section className='w-6/12 '>
                    <img src={docItem.img} alt="Imagem escolhida" className=' h-auto max-h-[500px] rounded-xl m-auto' />
                  </section>
                  <section className='w-6/12 '>
                    <p>{renderParagraphsWithIndentation(docItem.text)}</p>
                  </section>
                </div>
              ) : null}
              {docItem.type === 4 ? (
                <div className='flex flex-row gap-2 w-full'>
                  <img src={docItem.img} alt="Imagem escolhida" className='bg-white h-auto max-h-[500px] rounded-xl m-auto' />
                </div>
              ) : null}
              {docItem.type === 5 
                && 
                  <div className='w-9/12 p-10'>
                    <PDFViewer pdfUrl={arq}/>
                  </div>}
              <hr className='mt-2' />
            </div>
          ))
        )}
        <hr />
        {paginaUserId == matricula && arq === '' &&
        <section className='shadow mt-5 p-3 felx felx-row items-center rounded-xl'>
          <section>
            <button
            className="p-1 rounded-lg bg-red-500 ml-10 text-white mr-3 text-lg flex flex-row gap-5 items-center justify-around"
            onClick={() => setIsConfirmationModalOpen(true)}
          >
            <MdDeleteForever /> Deletar pagina
          </button>
            </section>
        </section>
        }
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={() => {
          handleDelete(id)
        }}
      />
      
    </div>
  );
};

export default Page;
