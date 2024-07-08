"use client";
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '../../../../app/axiosInstance';
import React, { useEffect, useState } from 'react';

interface Unidade {
    codigo: string;
    nome: string;
}

const Page = () => {
    const { id } = useParams();
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [turno, setTurno] = useState("");
    const [valorE, setValorE] = useState("");
    const [valorM, setValorM] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [unidades, setUnidades] = useState<Unidade[]>([]);

    const [curso, setCurso] = useState<any>({
        nome: '',
        unidade: '',
        turno: '',
        valor_E: '',
        valor_M: ''
    });

    // Função para buscar dados do curso pelo ID
    const fetchCurso = async () => {
        try {
            const response = await axiosInstance.get(`/valor/${id}`);
            const { nome, unidade, turno, valor_E, valor_M } = response.data.valor;
            setCurso({ nome, unidade, turno, valor_E, valor_M });
        } catch (error) {
            console.error('Erro ao buscar curso:', error);
        }
    };

    // Função para buscar unidades disponíveis
    const fetchUnidades = async () => {
        try {
            const response = await axiosInstance.get('/unidades');
            setUnidades(response.data);
        } catch (error) {
            console.error('Erro ao buscar unidades:', error);
        }
    };

    // Efeito para buscar dados do curso e unidades ao carregar o componente
    useEffect(() => {
        fetchCurso();
        fetchUnidades();
    }, []);

    // Efeito para preencher campos do formulário com dados do curso ao carregar
    useEffect(() => {
        if (curso) {
            setNome(curso.nome || "");
            setUnidade(curso.unidade || "");
            setTurno(curso.turno || "");
            setValorE(curso.valor_E.toString() || "");
            setValorM(curso.valor_M.toString() || "");
        }
    }, [curso]);

    const handleEnv = async () => {
        if (!nome || !unidade || !turno || !valorE || !valorM) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const cursoAtualizado = {
                nome,
                unidade,
                turno,
                valor_E: parseFloat(valorE),
                valor_M: parseFloat(valorM),
            };

            await axiosInstance.patch(`/valor/${id}`, cursoAtualizado);
            router.push(`/pages/calculadora`);
        } catch (error) {
            setError("Ocorreu um erro ao atualizar o curso. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-8">
            <div className="w-11/12 md:w-9/12 m-auto h-auto mb-10">
                <h1 className="ml-1 pb-2 pt-10 md:pt-12">Editar Curso</h1>
            </div>
            <div className="gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28">
                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10">
                    <input
                        type="text"
                        placeholder="Nome"
                        autoComplete="off"
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        aria-label="Nome"
                    />

                    <select
                        value={unidade}
                        onChange={(e) => setUnidade(e.target.value)}
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
                        aria-label="Unidade"
                    >
                        <option value="">Selecione uma unidade</option>
                        {unidades.map((unidade) => (
                            <option key={unidade.codigo} value={unidade.codigo}>
                                {unidade.nome}
                            </option>
                        ))}
                    </select>

                    <select
                        value={turno}
                        onChange={(e) => setTurno(e.target.value)}
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
                        aria-label="Turno"
                    >
                        <option value="">Selecione um turno</option>
                        <option value="M">Manhã</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                        <option value="E">Online</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Valor Escola"
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
                        value={valorE}
                        onChange={(e) => setValorE(e.target.value)}
                        aria-label="Valor Escola"
                    />

                    <input
                        type="number"
                        placeholder="Valor Material"
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
                        value={valorM}
                        onChange={(e) => setValorM(e.target.value)}
                        aria-label="Valor Material"
                    />
                </div>

                <section className="mt-10 w-11/12 items-center flex">
                    <button
                        className="m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg"
                        onClick={handleEnv}
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading ? "Aguarde..." : "Salvar Alterações"}
                    </button>
                </section>

                {error && <div className="mt-4 text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default Page;
