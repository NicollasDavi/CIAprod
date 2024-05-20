"use client";
import axiosInstance from '../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

interface Curso {
    id: string;
    nome: string;
}

interface Unidade {
    codigo: string;
    nome: string;
}

const Page = () => {
    const [cursoId, setCursoId] = useState("");
    const [unidade, setUnidade] = useState("");
    const [turno, setTurno] = useState("");
    const [parcelamento, setParcelamento] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [unidades, setUnidades] = useState<Unidade[]>([]);
    const [mensalidade, setMensalidade] = useState("");

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axiosInstance.get('/valores');
                setCursos(response.data);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
        };

        const fetchUnidades = async () => {
            try {
                const response = await axiosInstance.get('/unidades');
                setUnidades(response.data);
            } catch (error) {
                console.error('Erro ao buscar unidades:', error);
            }
        };

        fetchCursos();
        fetchUnidades();
    }, []);

    const handleEnv = async () => {
        setLoading(true);
        setError("");

        try {
            const curso = {
                id: cursoId,
                unidade,
                turno,
                parcelamento: Number(parcelamento),
                desconto: Number(desconto)
            };

            const response = await axiosInstance.post('/calc', curso);
            setMensalidade(response.data.mensalidade);
            setLoading(false);
        } catch (error) {
            setError("Ocorreu um erro ao calcular. Por favor, tente novamente.");
            setLoading(false);
        }
    };

    return (
        <div className='pt-8'>
            <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
                <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Calcular Mensalidade</h1>
            </div>
            <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10'>
                    <select value={cursoId} onChange={(e) => setCursoId(e.target.value)} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2">
                        <option value="">Selecione um curso</option>
                        {cursos.map(curso => (
                            <option key={curso.id} value={curso.id}>{curso.nome}</option>
                        ))}
                    </select>

                    <select value={unidade} onChange={(e) => setUnidade(e.target.value)} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2">
                        <option value="">Selecione uma unidade</option>
                        {unidades.map(unidade => (
                            <option key={unidade.codigo} value={unidade.nome}>{unidade.nome}</option>
                        ))}
                    </select>

                    <select 
                        value={turno} 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
                        onChange={(e) => setTurno(e.target.value)}
                    >
                        <option value="">Selecione um turno</option>
                        <option value="M">Manhã</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                        <option value="E">Online</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Parcelamento" 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
                        onChange={(e) => setParcelamento(Number(e.target.value))} 
                    />

                    <input 
                        type="number" 
                        placeholder="Desconto" 
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
                        onChange={(e) => setDesconto(Number(e.target.value))} 
                    />
                </div>
                <section className='mt-10 w-11/12 items-center flex'>
                    <button className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg' onClick={handleEnv} disabled={loading}>
                        {loading ? "Aguarde..." : "Calcular"}
                    </button>
                </section>
                {error && <div className="mt-4 text-red-500">{error}</div>}
                {mensalidade && <div className="mt-4 text-green-500">Mensalidade: {mensalidade}</div>}
            </div>
        </div>
    );
};

export default Page;
