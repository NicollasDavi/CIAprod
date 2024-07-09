"use client";
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '../../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

interface Unidade {
    codigo: string;
    nome: string;
}

const Page: React.FC = () => {
    const [image, setImage] = useState<Blob | null>(null);
    const [matricula, setMatricula] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [unidade, setUnidade] = useState<string>("");
    const [turno, setTurno] = useState<string>("");
    const [informacao, setInformacao] = useState<string>("");
    const [vai, setVai] = useState<boolean>(false);
    const [unidades, setUnidades] = useState<Unidade[]>([]);

    const router = useRouter();
    const courseId = useParams();

    const convertImageToBase64 = (image: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
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
                matricula: parseInt(matricula, 10),
                nome,
                unidade,
                turno,
                informacao,
                imagem: base64Image
            };

            console.log('Enviando dados do curso:', curso);

            await axiosInstance.patch(`/curso/${courseId}`, curso);
            router.push("/pages/datalist");
        } catch (error) {
            console.error('Erro ao atualizar curso:', error);
        }
    };

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                let base64Image = "";
                if (image) {
                    base64Image = await convertImageToBase64(image);
                }
                await handleEnv(base64Image);
            } catch (error) {
                console.error('Erro ao processar a imagem:', error);
            }
        };

        if (vai) {
            handleSubmit();
        }
    }, [vai]);

    useEffect(() => {
        const fetchUnidades = async () => {
            try {
                const response = await axiosInstance.get('/unidades');
                setUnidades(response.data);
                console.log('Unidades buscadas:', response.data);
            } catch (error) {
                console.error('Erro ao buscar unidades:', error);
            }
        };

        const fetchCurso = async () => {
            try {
                if (!courseId) {
                    console.error('courseId não definido');
                    return;
                }

                const response = await axiosInstance.get(`/curso/${courseId.id}`);
                console.log(courseId.id)
                const { matricula, nome, unidade, turno, informacao, imagem } = response.data;
                console.log('Dados do curso buscados:', response.data);

                setMatricula(matricula.toString());
                setNome(nome);
                setUnidade(unidade);
                setTurno(turno);
                setInformacao(informacao);
                setImage(imagem);
            } catch (error) {
                console.error('Erro ao buscar curso:', error);
            }
        };

        fetchUnidades();
        if (courseId) {
            fetchCurso();
        } else {
            console.error('courseId não está presente na URL');
        }
    }, []);

    const handleVai = () => {
        setVai(true);
    };

    return (
        <div className='pt-8'>
            <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
                <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Editar Curso</h1>
            </div>
            <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10'>
                    <input 
                        type="number" 
                        placeholder="Matricula" 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
                        value={matricula} 
                        onChange={(e) => setMatricula(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                    />
                    <select 
                        value={unidade} 
                        onChange={(e) => setUnidade(e.target.value)} 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
                    >
                        <option value="">Selecione uma unidade</option>
                        {unidades.map((unidade, index) => (
                            <option key={index} value={unidade.codigo}>{unidade.nome}</option>
                        ))}
                    </select>
                    <select 
                        value={turno} 
                        onChange={(e) => setTurno(e.target.value)} 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
                    >
                        <option value="">Selecione um turno</option>
                        <option value="M">Manhã</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                        <option value="E">Online</option>
                    </select>
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
                    <textarea 
                        placeholder="Informação" 
                        rows={10} 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
                        value={informacao} 
                        onChange={(e) => setInformacao(e.target.value)}
                    ></textarea>
                </section>
                <section className='mt-10 w-11/12 items-center flex'>
                    <button 
                        className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg' 
                        onClick={handleVai}
                    >
                        Atualizar Curso
                    </button>
                </section>
            </div>
        </div>
    );
};

export default Page;
