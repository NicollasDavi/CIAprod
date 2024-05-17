"use client"
import axiosInstance from '../../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [image, setImage] = useState<Blob>();
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [informacoes, setInformacoes] = useState("");
    const [vcep, setVcep] = useState("");
    const [numeroTel, setNumeroTel] = useState("");
    const [numeroWpp, setNumeroWpp] = useState("");
    const [horario, setHorario] = useState("");
    const [vai, setVai] = useState(0);

    const handleVai = () => {
        setVai(1);
    };

    const convertImageToBase64 = (image: Blob) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = error => {
                reject(error);
            };
        });
    };

    const handleEnv = async (base64Image: string) => {
        try {
            const unidade = {
                codigo,
                nome,
                informacoes,
                vcep,
                numeroTel,
                numeroWpp,
                horario,
                imagem: base64Image
            };
            console.log(unidade)
            const response = await axiosInstance.post('/unidade', unidade);
            setCodigo('');
            setNome('');
            setInformacoes('');
            setVcep('');
            setNumeroTel('');
            setNumeroWpp('');
            setHorario('');
            const id = response.data.id;
            window.location.replace(`/pages/unidade/${id}`);
        } catch (error) {
            console.error('Erro ao criar unidade:', error);
        }
    };

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                if (!image) {
                    console.error("Por favor, selecione uma imagem.");
                    return;
                }

                const base64Image = await convertImageToBase64(image);
                await handleEnv(base64Image);
            } catch (error) {
                console.error('Erro ao processar a imagem:', error);
            }
        };

        handleSubmit();
    }, [vai]);

    return (
        <div className='pt-8'>
            <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
                <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Criar Unidade</h1>
            </div>
            <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-10'>
                    <input type="text" placeholder="Código" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setCodigo(e.target.value)} />
                    <input type="text" placeholder="Nome" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setNome(e.target.value)} />
                    <input type="text" placeholder="Informações" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setInformacoes(e.target.value)} />
                    <input type="text" placeholder="CEP" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setVcep(e.target.value)} />
                    <input type="text" placeholder="Número Telefone" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setNumeroTel(e.target.value)} />
                    <input type="text" placeholder="Número WhatsApp" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setNumeroWpp(e.target.value)} />
                    <input type="text" placeholder="Horário" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setHorario(e.target.value)} />
                </div>
                <section className='mt-10'>
                    {!image ? (
                        <input
                            type='file'
                            className='md:w-6/12 w-full p-3 m-auto'
                            onChange={(e) => {
                                const file = e.target.files && e.target.files[0];
                                if (file) {
                                    setImage(file);
                                }
                            }}
                        />
                    ) : (
                        <img src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 w-full p-2 rounded-xl m-auto'/>
                    )}
                </section>
                <section className='mt-10 w-11/12 items-center flex'>
                    <button className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg' onClick={handleVai}>Criar Unidade</button>
                </section>
            </div>
        </div>
    );
};

export default Page;
