"use client"
import axiosInstance from '../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [image, setImage] = useState<Blob>();
    const [matricula, setMatricula] = useState("");
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [turno, setTurno] = useState("");
    const [informacao, setInformacao] = useState("");
    const [vai, setVai] = useState(0);
    const [unidades, setUnidades] = useState<any[]>([]);

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
            const curso = {
                matricula: parseInt(matricula),
                nome,
                unidade,
                turno,
                informacao,
                imagem: base64Image
            };

            await axiosInstance.post('/curso', curso);
            console.log(curso)
            setMatricula('');
            setNome('');
            setUnidade('');
            setTurno('');
            setInformacao('');
            setVai(0);
        } catch (error) {
            console.error('Erro ao criar curso:', error);
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

    useEffect(() => {
        const fetchUnidades = async () => {
            try {
                const response = await axiosInstance.get('/unidades');
                setUnidades(response.data);
            } catch (error) {
                console.error('Erro ao buscar unidades:', error);
            }
        };

        fetchUnidades();
    }, []);

    return (
        <div className='pt-8'>
            <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
                <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Criar Curso</h1>
            </div>
            <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10'>
                    <input type="number" placeholder="Matricula" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                    <input type="text" placeholder="Nome" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <select value={unidade} onChange={(e) => setUnidade(e.target.value)} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2">
                        <option value="">Selecione uma unidade</option>
                        {unidades.map((unidade, index) => (
                            <option key={index} value={unidade.codigo}>{unidade.nome}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Turno" className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={turno} onChange={(e) => setTurno(e.target.value)} />
                </div>
                <section className='mt-10 m-auto w-6/12'>
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
                        <img src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 w-full p-2 rounded-xl m-auto' />
                    )}
                </section>
                <section className='mt-10'>
                    <textarea placeholder="Informação" rows={10} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" value={informacao} onChange={(e) => setInformacao(e.target.value)}></textarea>
                </section>
                <section className='mt-10 w-11/12 items-center flex'>
                    <button className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg' onClick={handleVai}>Criar Curso</button>
                </section>
            </div>
        </div>
    );
};

export default Page;
