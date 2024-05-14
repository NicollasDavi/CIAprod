"use client"
import React, { useState, useEffect } from 'react';
import DocsModal from '../../../components/DocsModal';
import ImageText from '../../../components/layouts/ImageText';
import NotText from '../../../components/Nots/NotText';
import TextImage from '../../../components/layouts/TextImage';
import Text from '../../../components/layouts/Text';
import Image from '../../../components/layouts/Image';
import axiosInstance from '../../../app/axiosInstance';

interface DocType {
    type: number;
    text: string;
    img: string;
}

const Page = () => {
    const [image, setImage] = useState<File | Blob | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [open, setOpen] = useState(0);
    const [isNotTextOpen, setIsNotTextOpen] = useState(false);
    const [isNotTextImageOpen, setIsNotTextImageOpen] = useState(false);
    const [isNotImageOpen, setIsNotImageOpen] = useState(false);
    const [isNotImageTextOpen, setIsNotImageTextOpen] = useState(false);
    const [newTypeText, setNewTypeText] = useState("");
    const [doc, setDoc] = useState<{ nome: string; types: DocType[] }>({
        nome: "",
        types: []
    });
    const [selectedNotType, setSelectedNotType] = useState<number | null>(null);

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

    useEffect(() => {
        setDoc(prevDoc => ({
            ...prevDoc,
            nome: nome
        }));
    }, [nome]);

    const env = () => {
        axiosInstance.post('/doc', doc)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }

    const addNewType = (type: number) => {
        const newText = newTypeText.replace(/\n\s*\n/g, '\n\n');

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
                setImage(null); // Alteração aqui
                closeText();
            }).catch(error => {
                console.error('Erro ao converter imagem para base64:', error);
            });
        } else {
            console.error('Nenhuma imagem selecionada.');
        }
    };

    const handleSave = () => {
        if (selectedNotType !== null) {
            addNewType(selectedNotType);
            setSelectedNotType(null);
        }
    };

    const removeItem = (indexToRemove: number) => {
        setDoc(prevDoc => {
            const { nome, types } = prevDoc;
            const updatedTypes = types.filter((_, index) => index !== indexToRemove);
            return { nome, types: updatedTypes };
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
                <section className='mt-16 items-end'>
                    <input type="text" value={nome} className='ml-1 border mb-3' onChange={(e) => setNome(e.target.value)} />
                    <hr className='mt-2'/>
                </section>
                {doc.types.map((item, index) => (
                    <div key={index} className='p-2 flex flex-row gap-2 '>
                         <button className=' px-3 py-1 rounded-full w-[30px] text-center h-[30px] text-white' onClick={() => removeItem(index)}>R</button>
                        {item.type === 1 ? (
                             <section className='w-12/12 '>
                                <p >{item.text}</p>
                           </section>
                        ) : ""}
                        {item.type === 2 ?(
                            <div className='flex flex-row gap-2 w-full'>
                               <section className='w-6/12 '>
                                 <p >{item.text}</p>
                               </section>
                               <section className='w-6/12 '>
                                    <Image src={item.img} alt="Imagem escolhida" className=' h-auto max-h-[500px] rounded-xl m-auto'/>
                                </section>                            </div>
                        ) : ""}
                        {item.type === 3 ? (
                            <div className='flex flex-row gap-2 w-full'>
                                <section className='w-6/12 '>
                                    <Image src={item.img} alt="Imagem escolhida" className=' h-auto max-h-[500px] rounded-xl m-auto'/>
                                </section>
                               <section className='w-6/12 '>
                                 <p >{item.text}</p>
                               </section>
                            </div>
                        ) : "" }
                         {item.type === 4 ? (
                            <div className='flex flex-row gap-2 w-full'>
                                <Image src={item.img} alt="Imagem escolhida" className='bg-white h-auto max-h-[500px] rounded-xl m-auto'/>
                            </div>
                        ) : "" }
                        <hr className='mt-2'/>
                    </div>
                ))}
                <hr />
                <NotText isNotTextOpen={isNotTextImageOpen} onNotTextClose={closeText} onSave={handleSave} type={selectedNotType || 3}>
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
                            <Image src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 m-auto w-full p-2 rounded-xl'/>
                        )}
                    </div>
                </NotText>
                <NotText isNotTextOpen={isNotImageTextOpen} onNotTextClose={closeText} onSave={handleSave} type={selectedNotType || 3}>
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
                            <Image src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 m-auto w-full p-2 rounded-xl'/>
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
                <NotText isNotTextOpen={isNotImageOpen} onNotTextClose={closeText} onSave={handleSave} type={selectedNotType || 3}>
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
                            <Image src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 m-auto w-full p-2 rounded-xl'/>
                        )}
                    </div>
                </NotText>
                <NotText isNotTextOpen={isNotTextOpen} onNotTextClose={closeText} onSave={handleSave} type={selectedNotType || 3}>
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
               <section className='w-full '>
                <button className='px-10 py-1 text-white rounded-3xl bg-blue-500 ml-3 mt-10' onClick={() => env()}>Salvar</button>
               </section>
            </div>
        </div>
    );
};

export default Page;
