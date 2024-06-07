import React from 'react';

interface Curso {
  id: string;
  nome: string;
}

interface Unidade {
  codigo: string;
  nome: string;
}

interface CourseSelectionFormProps {
  cursos: Curso[];
  unidades: Unidade[];
  cursoId: string;
  unidade: string;
  turno: string;
  parcelamento: number;
  desconto: number;
  setCursoId: (id: string) => void;
  setUnidade: (unidade: string) => void;
  setDate: (date: Date) => void;
  setTurno: (state : string) => void;
  setCliente: (state: string) => void;
  setParcelamento: (parcelamento: number) => void;
  setDesconto: (desconto: number) => void;
  setStateOfCalc: (state: boolean) => void;
  setNome: (state: string) => void;
  stateOfCalc: boolean;
  nome: string;
  adicional: string;
  setAdicional: (state : string) => void;
}

const CourseSelectionForm: React.FC<CourseSelectionFormProps> = ({
  cursos,
  unidades,
  cursoId,
  unidade,
  turno,
  parcelamento,
  desconto,
  setTurno,
  setCursoId,
  setUnidade,
  setCliente,
  setParcelamento,
  setDesconto,
  setStateOfCalc,
  stateOfCalc,
  nome,
  setDate,
  setNome,
  adicional,
  setAdicional
}) => {
  const handleCursoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedCurso = cursos.find(curso => curso.id === selectedValue);
    if (selectedCurso) {
      setCursoId(selectedValue);
      setNome(selectedCurso.nome);
    }
  };

  const renderInputs = () => {
    if (stateOfCalc) {
      return (
        <>
          <input 
            type="text" 
            placeholder="Cliente" 
            className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"  
            onChange={(e) => setCliente(e.target.value)} 
          />
          <input 
            type="date" 
            placeholder="Data Limite" 
            className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"  
            onChange={(e) => setDate(new Date(e.target.value))} 
          />
        </>
      );
    } else {
      return (
        <select 
          className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
          onChange={(e) => setTurno(e.target.value)}
        >
          <option value="M">Manhã</option>
          <option value="T">Tarde</option>
          <option value="N">Noite</option>
          <option value="O">Online</option>
        </select>
      );
    }
  };

  return (
    <div className="gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28">
      <label>
        <input type="checkbox" onChange={() => setStateOfCalc(!stateOfCalc)} />
        <span>Calcular inverso</span>
      </label>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10">
        <select 
          value={cursoId} 
          onChange={handleCursoChange} 
          className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
        >
          <option value="">Selecione um curso</option>
          {cursos.map(curso => (
            <option key={curso.id} value={curso.id}>{curso.nome}</option>
          ))}
        </select>
        <select 
          value={unidade} 
          onChange={(e) => setUnidade(e.target.value)} 
          className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"
        >
          <option value="">Selecione uma unidade</option>
          {unidades.map(unidade => (
            <option key={unidade.codigo} value={unidade.nome}>{unidade.nome}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Parcelamento" 
          className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2"  
          onChange={(e) => setParcelamento(Number(e.target.value))} 
        />
        {renderInputs()}
        <input 
          type="number" 
          placeholder="Desconto" 
          className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
          onChange={(e) => setDesconto(Number(e.target.value))} 
        />
      <section className="flex items-center space-x-4">
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      className="form-checkbox text-blue-500 h-5 w-5 accent-blue1 checked:border-transparent"
      onChange={() => setAdicional("Integral")}
      checked={adicional === "Integral"}
    />
    <span className="ml-2 text-gray-700">Integral</span>
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      className="form-checkbox text-blue-500 h-5 w-5 accent-blue1 checked:border-transparent"
      onChange={() => setAdicional("Posiplay")}
      checked={adicional === "Posiplay"}
    />
    <span className="ml-2 text-gray-700">Posiplay</span>
  </label>
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      className="form-checkbox text-blue-500 h-5 w-5 accent-blue1 checked:border-transparent"
      onChange={() => setAdicional("")}
      checked={adicional === ""}
    />
    <span className="ml-2 text-gray-700">Nenhum</span>
  </label>
</section>

      </div>
    </div>
  );
};

export default CourseSelectionForm;
