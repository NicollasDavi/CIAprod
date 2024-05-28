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
  setTurno: (turno: string) => void;
  setParcelamento: (parcelamento: number) => void;
  setDesconto: (desconto: number) => void;
  setStateOfCalc: (state: boolean) => void;
  setNome: (state: string) => void;
  stateOfCalc: boolean;
  nome: string;
}

const CourseSelectionForm: React.FC<CourseSelectionFormProps> = ({
  cursos,
  unidades,
  cursoId,
  unidade,
  turno,
  parcelamento,
  desconto,
  setCursoId,
  setUnidade,
  setTurno,
  setParcelamento,
  setDesconto,
  setStateOfCalc,
  stateOfCalc,
  nome,
  setNome
}) => {
  const handleCursoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedCurso = cursos.find(curso => curso.id === selectedValue);
    if (selectedCurso) {
      setCursoId(selectedValue);
      setNome(selectedCurso.nome);
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

        <select 
          value={turno} 
          className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" 
          onChange={(e) => setTurno(e.target.value)}
        >
          <option value="">Selecione um turno</option>
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
          <option value="Noite">Noite</option>
          <option value="Online">Online</option>
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
    </div>
  );
};

export default CourseSelectionForm;
