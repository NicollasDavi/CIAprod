"use client";
import React, { useEffect, useState } from 'react';
import CalcResult from '@/src/components/CalcResult';
import CourseSelectionForm from '@/src/components/CourseSelectionForm';
import axiosInstance from '../../../app/axiosInstance';

interface Curso {
  id: string;
  nome: string;
}

interface Unidade {
  codigo: string;
  nome: string;
}

const Page: React.FC = () => {
  const [cursoId, setCursoId] = useState<string>("");
  const [unidade, setUnidade] = useState<string>("");
  const [turno, setTurno] = useState<string>("");
  const [parcelamento, setParcelamento] = useState<number>(0);
  const [desconto, setDesconto] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [mensalidade, setMensalidade] = useState<string>("");
  const [stateOfCalc, setStateOfCalc] = useState<boolean>(true);

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

    const reqUrl = stateOfCalc ? '/calc' : '/calc/inverso';

    try {
      const curso = {
        id: cursoId,
        unidade,
        turno,
        parcelamento: Number(parcelamento),
        desconto: desconto
      };

      const response = await axiosInstance.post(reqUrl, curso);
      setMensalidade(response.data.mensalidade);
    } catch (error) {
      console.error("Erro ao calcular:", error);
      setError("Ocorreu um erro ao calcular. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8">
      <div className="w-11/12 md:w-9/12 m-auto h-auto mb-10">
        <h1 className="ml-1 pb-2 pt-10 md:pt-12">Calcular Mensalidade</h1>
      </div>
      <CourseSelectionForm
        cursos={cursos}
        unidades={unidades}
        cursoId={cursoId}
        unidade={unidade}
        turno={turno}
        parcelamento={parcelamento}
        desconto={desconto}
        setCursoId={setCursoId}
        setUnidade={setUnidade}
        setTurno={setTurno}
        setParcelamento={setParcelamento}
        setDesconto={setDesconto}
        setStateOfCalc={setStateOfCalc}
        stateOfCalc={stateOfCalc}
      />
      <section className="mt-10 w-11/12 items-center flex">
        <button className="m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg" onClick={handleEnv} disabled={loading}>
          {loading ? "Aguarde..." : "Calcular"}
        </button>
      </section>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <CalcResult aluno='Nicollas Davi de Souza Brandão' curso={cursoId} mensalidade={mensalidade} parcelamento={parcelamento} turno={turno} unidade={unidade}/>
    </div>
  );
};

export default Page;
