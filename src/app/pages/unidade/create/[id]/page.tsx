"use client"
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '../../../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const { id } = useParams();
    const router = useRouter();
    const [image, setImage] = useState<Blob>();
    const [imageUrl, setImageUrl] = useState<string>(""); // State para armazenar a URL da imagem atual
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

    // Função para buscar dados da unidade pelo ID
    const fetchUnidade = async () => {
        try {
            const response = await axiosInstance.get(`/unidade/${id}`);
            const unidadeData = response.data;
            setCodigo(unidadeData.codigo || "");
            setNome(unidadeData.nome || "");
            setInformacoes(unidadeData.informacoes || "");
            setVcep(unidadeData.vcep || "");
            setNumeroTel(unidadeData.numeroTel || "");
            setNumeroWpp(unidadeData.numeroWpp || "");
            setHorario(unidadeData.horario || "");
            setImageUrl(unidadeData.imagem || ""); // Definir a URL da imagem existente
        } catch (error) {
            console.error('Erro ao buscar unidade:', error);
        }
    };

    useEffect(() => {
        fetchUnidade();
    }, []);

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
                imagem: base64Image || imageUrl // Usar a imagem atual se nenhuma nova for selecionada
            };
            const response = await axiosInstance.patch(`/unidade/${id}`, unidade);
            setCodigo('');
            setNome('');
            setInformacoes('');
            setVcep('');
            setNumeroTel('');
            setNumeroWpp('');
            setHorario('');
            window.location.replace(`/pages/unidade/${id}`);
        } catch (error) {
            console.error('Erro ao atualizar unidade:', error);
        }
    };

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                if (!image && !imageUrl) { // Verificar se nenhuma imagem foi selecionada e se não há uma imagem atual
                    console.error("Por favor, selecione uma imagem.");
                    return;
                }

                const base64Image = image ? await convertImageToBase64(image) : ""; // Converter imagem apenas se uma nova foi selecionada
                await handleEnv(base64Image);
            } catch (error) {
                console.error('Erro ao processar a imagem:', error);
            }
        };

        if (vai === 1) {
            handleSubmit();
        }
    }, [vai, image, imageUrl]); // Incluir imageUrl como dependência para monitorar mudanças na imagem atual

    return (
        <div className='pt-8'>
            <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
                <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Editar Unidade</h1>
            </div>
            <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-10'>
                    <input type="text" placeholder="Código" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                    <input type="text" placeholder="Nome" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <input type="text" placeholder="Informações" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={informacoes} onChange={(e) => setInformacoes(e.target.value)} />
                    <input type="text" placeholder="CEP" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={vcep} onChange={(e) => setVcep(e.target.value)} />
                    <input type="text" placeholder="Número Telefone" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={numeroTel} onChange={(e) => setNumeroTel(e.target.value)} />
                    <input type="text" placeholder="Número WhatsApp" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={numeroWpp} onChange={(e) => setNumeroWpp(e.target.value)} />
                    <input type="text" placeholder="Horário" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={horario} onChange={(e) => setHorario(e.target.value)} />
                </div>
                <section className='mt-10'>
                    {!image && !imageUrl ? (
                        <p>Nenhuma imagem selecionada.</p>
                    ) : (
                        <img src={image ? URL.createObjectURL(image) : imageUrl} alt="Imagem escolhida" className='md:w-3/12 w-full p-2 rounded-xl m-auto'/>
                    )}
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
                </section>
                <section className='mt-10 w-11/12 items-center flex'>
                    <button className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg' onClick={handleVai}>Atualizar Unidade</button>
                </section>
            </div>
        </div>
    );
};

export default Page;
