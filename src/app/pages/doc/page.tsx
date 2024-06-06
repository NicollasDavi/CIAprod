"use client"
import React, { useState, useEffect } from 'react';
import DocsModal from '../../../components/DocsModal';
import ImageText from '../../../components/layouts/ImageText';
import NotText from '../../../components/Nots/NotText';
import TextImage from '../../../components/layouts/TextImage';
import Text from '../../../components/layouts/Text';
import Image from '../../../components/layouts/Image';
import axiosInstance from '../../../app/axiosInstance';
import { BiSolidEdit } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useRenderContext } from '../../context/renderContext';

interface DocType {
    type: number;
    text: string;
    img: string;
}

const Page = () => {
    const router = useRouter()
    const { matricula, ...otherProps } = useRenderContext();
    const [image, setImage] = useState<File | Blob | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [open, setOpen] = useState(0);
    const [isNotTextOpen, setIsNotTextOpen] = useState(false);
    const [isNotTextImageOpen, setIsNotTextImageOpen] = useState(false);
    const [isNotImageOpen, setIsNotImageOpen] = useState(false);
    const [isNotImageTextOpen, setIsNotImageTextOpen] = useState(false);
    const [newTypeText, setNewTypeText] = useState("");
    const [publica, setPublica] = useState(false)
    const [doc, setDoc] = useState<{publica: boolean, userId: string ,nome: string; types: DocType[] }>({
        nome: "",
        types: [],
        userId: "",
        publica
    });
    const [selectedNotType, setSelectedNotType] = useState<number | null>(null);

    const handleSetPublica = () => {
        setPublica(!publica);
        setDoc(prevDoc => ({
            ...prevDoc,
            publica: !publica,
        }));
    };
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeText = () => setOpen(0);

    useEffect(() => {
        if (image) {
            convertImageToBase64(image);
        }
    }, [image]);

    useEffect(() => {
        switch (open) {
            case 1:
                setIsNotTextOpen(true);
                setIsNotTextImageOpen(false);
                setIsNotImageOpen(false);
                setIsNotImageTextOpen(false);
                break;
            case 2:
                setIsNotTextImageOpen(true);
                setIsNotTextOpen(false);
                setIsNotImageOpen(false);
                setIsNotImageTextOpen(false);
                break;
            case 3:
                setIsNotTextImageOpen(false);
                setIsNotTextOpen(false);
                setIsNotImageOpen(false);
                setIsNotImageTextOpen(true);
                break;
            case 4:
                setIsNotTextImageOpen(false);
                setIsNotTextOpen(false);
                setIsNotImageOpen(true);
                setIsNotImageTextOpen(false);
                break;
            case 0:
                setIsNotTextOpen(false);
                setIsNotTextImageOpen(false);
                setIsNotImageOpen(false);
                setIsNotImageTextOpen(false);
                break;
            default:
                break;
        }
    }, [open]);

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


    useEffect(() => {
        setDoc(prevDoc => ({
            ...prevDoc,
            nome: nome,
            userId: matricula,
            publica: publica 
        }));
    }, [nome]);

const cancelar = () => {
    router.push("/pages/docs");
}

    const env = () => {
        axiosInstance.post('/doc', doc)
            .then(response => {
                router.push(`/pages/usedoc/${response.data.pagina.id}`)
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    const addNewType = (type: number) => {
        const newText = newTypeText.replace(/\n\s*\n/g, '\n\n');
        console.log("oi")
        if (image) {
            convertImageToBase64(image).then(base64Image => {
                const newType: DocType = {
                    type: type,
                    text: newText,
                    img: base64Image
                };

                setDoc(prevDoc => ({
                    ...prevDoc,
                    types: [...prevDoc.types, newType]
                }));

                setNewTypeText("");
                setImage(null);
                closeText();
            }).catch(error => {
                console.error('Erro ao converter imagem para base64:', error);
            });
        } else {
            const newType: DocType = {
                type: type,
                text: newText,
                img: ""
            };

            setDoc(prevDoc => ({
                ...prevDoc,
                types: [...prevDoc.types, newType]
            }));

            setNewTypeText("");
            closeText();
            console.error('Nenhuma imagem selecionada.');
        }
    };

    const handleSave = () => {
        console.log(selectedNotType)
        if (selectedNotType !== null) {
            addNewType(selectedNotType);
            setSelectedNotType(null);
        }
    };

    const removeItem = (indexToRemove: number) => {
        setDoc(prevDoc => {
            const { nome, types, userId, publica } = prevDoc;
            const updatedTypes = types.filter((_, index) => index !== indexToRemove);
            return { publica, userId, nome, types: updatedTypes };
        });
    };

    useEffect(() => {
        console.log("Estado atualizado:", doc);
        console.log(nome);
    }, [doc]);

    const convertImageToBase64 = (image: File | Blob) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            const blob = new Blob([image], { type: 'text/plain' });

            reader.readAsDataURL(blob);
            reader.onload = () => {
                resolve(reader.result as string);

            };
            reader.onerror = error => {
                reject(error);
            };
        });
    };
 

    return (
        <div className='pt-8'>
            <div className='w-10/12 md:w-9/12 m-auto h-auto mb-10'>
            <section className='mt-16 flex items-center'>
                <input 
                    type="text" 
                    value={nome} 
                    className='border mb-3 text-lg p-2 rounded-md w-4/12'
                    onChange={(e) => setNome(e.target.value)} 
                    placeholder="Digite o nome"
                />
                <section className='flex items-center justify-center ml-4'>
                    <input 
                    type="checkbox" 
                    onChange={() => handleSetPublica()} 
                    id="publica-checkbox"
                    className='form-checkbox h-5 w-5 text-blue-600'
                    />
                    <label htmlFor="publica-checkbox" className='ml-2'>
                    Publica
                    </label>
                </section>
                </section>
                <hr className='mt-2'/>
                {doc.types.map((item, index) => (
                    <div key={index} className='p-2 flex flex-row gap-2 '>
                         <button className=' px-3 py-1 rounded-full w-[30px] text-center h-[30px] text-white bg-red-500' onClick={() => removeItem(index)}>R</button>
                        {item.type === 1 ? (
                             <section className='w-12/12 '>
                                <p >{renderParagraphsWithIndentation(item.text)}</p>
                           </section>
                        ) : ""}
                        {item.type === 2 ?(
                            <div className='flex flex-row gap-2 w-full'>
                               <section className='w-6/12 '>
                                 <p >{renderParagraphsWithIndentation(item.text)}</p>
                               </section>
                               <section className='w-6/12 '>
                                    <img src={item.img} alt="Imagem escolhida" className=' h-auto max-h-[500px] rounded-xl m-auto'/>
                                </section>                            </div>
                        ) : ""}
                        {item.type === 3 ? (
                            <div className='flex flex-row gap-2 w-full'>
                                <section className='w-6/12 '>
                                    <img src={item.img} alt="Imagem escolhida" className=' h-auto max-h-[500px] rounded-xl m-auto'/>
                                </section>
                               <section className='w-6/12 '>
                                 <p >{renderParagraphsWithIndentation(item.text)}</p>
                               </section>
                            </div>
                        ) : "" }
                         {item.type === 4 ? (
                            <div className='flex flex-row gap-2 w-full'>
                                <img src={item.img} alt="Imagem escolhida" className='bg-white h-auto max-h-[500px] rounded-xl m-auto'/>
                            </div>
                        ) : "" }
                        <hr className='mt-2'/>
                    </div>
                ))}
                <hr />
                <NotText isNotTextOpen={isNotTextImageOpen} onNotTextClose={closeText} onSave={handleSave} type={2}>
                    <div className='flex md:flex-row flex-col gap-2'>
                        <textarea
                            name=""
                            id=""
                            cols={30}
                            rows={10}
                            className='md:w-6/12 w-full rounded-xl p-2'
                            value={newTypeText}
                            onChange={(e) => setNewTypeText(e.target.value)}
                            
                        ></textarea>
                        {!image ? (
                           <input
                           type='file'
                           className='md:w-6/12 w-full p-3'
                           onChange={(e) => {
                               const file = e.target.files && e.target.files[0];
                               if (file) {
                                   setImage(file);
                               }
                           }}
                       />
                        ) : (
                            <img src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 m-auto w-full p-2 rounded-xl'/>
                        )}
                    </div>
                </NotText>
                <NotText isNotTextOpen={isNotImageTextOpen} onNotTextClose={closeText} onSave={handleSave} type={3}>
                    <div className='flex md:flex-row flex-col gap-2'>
                        {!image ? (
                           <input
                           type='file'
                           className='md:w-6/12 w-full p-3'
                           onChange={(e) => {
                               const file = e.target.files && e.target.files[0];
                               if (file) {
                                   setImage(file);
                               }
                           }}
                       />
                        ) : (
                            <img src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 m-auto w-full p-2 rounded-xl'/>
                        )}
                         <textarea
                            name=""
                            id=""
                            cols={30}
                            rows={10}
                            className='md:w-6/12 w-full rounded-xl p-2'
                            value={newTypeText}
                            onChange={(e) => setNewTypeText(e.target.value)}
                            
                        ></textarea>
                    </div>
                </NotText>
                <NotText isNotTextOpen={isNotImageOpen} onNotTextClose={closeText} onSave={handleSave} type={4}>
                    <div className='flex md:flex-row flex-col gap-2'>
                        {!image ? (
                           <input
                           type='file'
                           className='md:w-6/12 w-full p-3'
                           onChange={(e) => {
                               const file = e.target.files && e.target.files[0];
                               if (file) {
                                   setImage(file);
                               }
                           }}
                       />
                        ) : (
                            <img src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 m-auto w-full p-2 rounded-xl'/>
                        )}
                    </div>
                </NotText>
                <NotText isNotTextOpen={isNotTextOpen} onNotTextClose={closeText} onSave={handleSave} type={1}>
                        <textarea
                            name=""
                            id=""
                            cols={30}
                            rows={10}
                            className='md:w-6/12 w-full rounded-xl p-2'
                            value={newTypeText}
                            onChange={(e) => setNewTypeText(e.target.value)}
                            
                        ></textarea>
                </NotText>
                <div className='w-full justify-end flex'>
                    <section>
                        <button onClick={openModal} className='bg-[#3B82F6] text-white px-2 rounded-full mt-3 mr-10'>+</button>
                    </section>
                    <section className='absolute mb-48'>
                    <DocsModal isOpen={isModalOpen} onClose={closeModal} style="relative">
                    <div className='p-2'>
                        <ImageText func={() => { setOpen(3), setSelectedNotType(3)}}/>
                        <TextImage func={() => { setOpen(2), setSelectedNotType(2)}}/>
                        <Text func={() => { setOpen(1), setSelectedNotType(1)}}  />
                        <Image func={() => { setOpen(4), setSelectedNotType(4)}}/>
                    </div>
                </DocsModal>
                    </section>
                </div>
                <section className='w-full flex flex-row'>
                    <button 
                        className='px-10 py-1 text-white rounded-3xl bg-blue-500 ml-3 mt-10' 
                        onClick={() => env()}
                    >
                        Salvar
                    </button>
                    <button 
                        className='px-10 py-1 text-white rounded-3xl bg-red-500 ml-3 mt-10' 
                        onClick={() => cancelar()}
                    >
                        Cancelar
                    </button>
                   
                   
                </section>

            </div>
        </div>
    );
};

export default Page;
