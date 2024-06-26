"use client";
import axiosInstance from "../../../../app/axiosInstance";
import React, { useEffect, useState } from "react";

interface Unidade {
    codigo: string;
    nome: string;
}

const Page = () => {
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [turno, setTurno] = useState("");
    const [valorE, setValorE] = useState("");
    const [valorM, setValorM] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [unidades, setUnidades] = useState<Unidade[]>([]);

    useEffect(() => {
        const fetchUnidades = async () => {
            try {
                const response = await axiosInstance.get('/unidades');
                setUnidades(response.data);
            } catch (error) {
                console.error("Erro ao buscar unidades:", error);
            }
        };
        fetchUnidades();
    }, []);

    const handleEnv = async () => {
        if (!nome || !unidade || !turno || !valorE || !valorM) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const curso = {
                nome,
                unidade,
                turno,
                valor_E: parseFloat(valorE),
                valor_M: parseFloat(valorM),
            };

            await axiosInstance.post('/valor', curso);
            window.location.replace(`/pages/calculadora`);
        } catch (error) {
            setError("Ocorreu um erro ao criar o curso. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-8">
            <div className="w-11/12 md:w-9/12 m-auto h-auto mb-10">
                <h1 className="ml-1 pb-2 pt-10 md:pt-12">Criar Curso</h1>
            </div>
            <div className="gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28">
                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10">
                    <input
                        type="text"
                        placeholder="Nome"
                        autoComplete="off"
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
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
                            <option key={unidade.codigo} value={unidade.nome}>
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
                        onChange={(e) => setValorE(e.target.value)}
                        aria-label="Valor Escola"
                    />

                    <input
                        type="number"
                        placeholder="Valor Material"
                        className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
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
                        {loading ? "Aguarde..." : "Criar Curso"}
                    </button>
                </section>

                {error && <div className="mt-4 text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default Page;
