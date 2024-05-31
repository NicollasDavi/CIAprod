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
  const [aluno, setAluno] = useState<string>("");
  const [parcelamento, setParcelamento] = useState<number>(0);
  const [desconto, setDesconto] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [data, setData] = useState<Date>();
  const [turno, setTurno] = useState<string>("");

  const [mensalidadeInv, setMensalidadeInv] = useState<string>("");

  const [mensalidadeManha, setMensalidadeManha] = useState<string>("");
  const [mensalidadeTarde, setMensalidadeTarde] = useState<string>("");
  const [mensalidadeNoite, setMensalidadeNoite] = useState<string>("");
  const [mensalidadeOnline, setMensalidadeOnline] = useState<string>("");
  const [mensalidadeManhaDesconto, setMensalidadeManhaDesconto] = useState<string>("");
  const [mensalidadeTardeDesconto, setMensalidadeTardeDesconto] = useState<string>("");
  const [mensalidadeNoiteDesconto, setMensalidadeNoiteDesconto] = useState<string>("");
  const [mensalidadeOnlineDesconto, setMensalidadeOnlineDesconto] = useState<string>("");

  const [stateOfCalc, setStateOfCalc] = useState<boolean>(true);
  const [nome, setNome] = useState<string>("");

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axiosInstance.get('/valores');
        const uniqueCursos = response.data.filter((curso: Curso, index: number, self: Curso[]) => {
          return index === self.findIndex((c: Curso) => (
            c.nome === curso.nome
          ));
        });
        setCursos(uniqueCursos);
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

  useEffect(() => {
    setMensalidadeInv("");
    setMensalidadeManha("");
    setMensalidadeTarde("");
    setMensalidadeNoite("");
    setMensalidadeOnline("");
    setMensalidadeManhaDesconto("");
    setMensalidadeTardeDesconto("");
    setMensalidadeNoiteDesconto("");
    setMensalidadeOnlineDesconto("");
  }, [cursoId, unidade, aluno, parcelamento, desconto, turno]);

  const handleEnv = async () => {
    setLoading(true);
    setError("");

    const reqUrl = stateOfCalc ? '/calc' : '/calc/inverso';

    try {
      const curso = {
        nome,
        unidade,
        parcelamento: Number(parcelamento),
        desconto: desconto
      };

      const response = await axiosInstance.post(reqUrl, curso);
      const data = response.data;
      if (stateOfCalc) {
        setMensalidadeManha(data.mensalidadeManha);
        setMensalidadeTarde(data.mensalidadeTarde);
        setMensalidadeNoite(data.mensalidadeNoite);
        setMensalidadeOnline(data.mensalidadeOnline);
        setMensalidadeManhaDesconto(data.mensalidadeManhaDesconto);
        setMensalidadeTardeDesconto(data.mensalidadeTardeDesconto);
        setMensalidadeNoiteDesconto(data.mensalidadeNoiteDesconto);
        setMensalidadeOnlineDesconto(data.mensalidadeOnlineDesconto);
      } else {
        setMensalidadeInv(data.mensalidade);
      }
      
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
        setNome={setNome}
        nome={nome}
        cursos={cursos}
        unidades={unidades}
        cursoId={cursoId}
        unidade={unidade}
        parcelamento={parcelamento}
        desconto={desconto}
        setCursoId={setCursoId}
        setUnidade={setUnidade}
        setCliente={setAluno}
        setParcelamento={setParcelamento}
        setDesconto={setDesconto}
        setStateOfCalc={setStateOfCalc}
        stateOfCalc={stateOfCalc}
        setDate={setData}
        turno={turno}
        setTurno={setTurno}
      />
      <section className="mt-10 w-11/12 items-center flex">
        <button className="m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg" onClick={handleEnv} disabled={loading}>
          {loading ? "Aguarde..." : "Calcular"}
        </button>
      </section>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-xl p-4 mt-72 lg:mt-48'>
        <CalcResult 
          aluno={aluno}
          curso={nome}
          mensalidade={mensalidadeInv}
          parcelamento={parcelamento}
          unidade={unidade}
          dataLimite={data ? data : new Date()}
          desconto={desconto}
          turnoManha={mensalidadeManha ? "Manhã" : ""}
          turnoTarde={mensalidadeTarde ? "Tarde" : ""}
          turnoNoite={mensalidadeNoite ? "Noite" : ""}
          turnoOnline={mensalidadeOnline ? "Online" : ""}
          mensalidadeManha={mensalidadeManha}
          mensalidadeTarde={mensalidadeTarde}
          mensalidadeNoite={mensalidadeNoite}
          mensalidadeOnline={mensalidadeOnline}
          mensalidadeManhaDesconto={mensalidadeManhaDesconto}
          mensalidadeTardeDesconto={mensalidadeTardeDesconto}
          mensalidadeNoiteDesconto={mensalidadeNoiteDesconto}
          mensalidadeOnlineDesconto={mensalidadeOnlineDesconto}
          turno={turno}        
          state={stateOfCalc}
        />
      </div>
    </div>
  );
};

export default Page;
