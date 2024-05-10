"use client"
import axiosInstance from '../../../app/axiosInstance'
import React, { useState } from 'react'


const Page = () => {
    const [image, setImage] = useState<Blob>();
    const [matricula, setMatricula] = useState("")
    const [nome, setNome] = useState("")
    const [unidade, setUnidade] = useState("")
    const [turno, setTurno] = useState("")
    const [informacao, setinformacao] = useState("")
    const [valor_e, setValor_e] = useState("")
    const [valor_m, setValor_m] = useState("")
    const [contra_t, setContra_t] = useState("")
    const [integral, setIntegral] = useState("")

    const handleEnv = () => {
        if (!image) {
            console.error("Por favor, selecione uma imagem.");
            return;
        }
    
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
    
        convertImageToBase64(image)
            .then(base64Image => {
                console.log()
                const curso = {
                    matricula: parseInt(matricula),
                    nome: nome,
                    unidade: unidade,
                    turno: turno,
                    informacao: informacao,
                    valor_E: parseFloat(valor_e),
                    valor_M: parseFloat(valor_m),
                    contra_T: contra_t,
                    integral: integral,
                    imagem: base64Image
                };
    
                console.log(curso);
    
                axiosInstance.post('/curso', curso)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
            })
            .catch(error => {
                console.error('Erro ao converter imagem:', error);
            });
    };
    

  return (
    <div className='pt-8'>
      <div className='w-11/12 md:w-9/12 m-auto h-auto mb-10'>
        <h1 className='ml-1 pb-2 pt-10 md:pt-12'>Criar Curso</h1>
      </div>
      <div className='gap-4 md:gap-0 w-11/12 m-auto h-auto mb-10 md:pl-28'>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-4 md:gap-10'>
        <input type="number" placeholder="Matricula" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setMatricula(e.target.value)}/>

        <input type="text" placeholder="Nome" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setNome(e.target.value)}/>

        <input type="text" placeholder="Unidade" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setUnidade(e.target.value)}/>

        <input type="text" placeholder="Turno" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setTurno(e.target.value)}/>
        
        <input type="text" placeholder="Valor Escola" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e => setValor_e(e.target.value))}/>

        <input type="text" placeholder="Valor Material" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setValor_m(e.target.value)}/>

        <input type="text" placeholder="Contra Turno" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setContra_t(e.target.value)}/>

        <input type="text" placeholder="Integral" className="bg-gray-400/30 md:bg-white   w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setIntegral(e.target.value)}/>

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
                        <img src={URL.createObjectURL(image)} alt="Imagem escolhida" className='md:w-3/12 w-full p-2 rounded-xl m-auto'/>
                    )}
        </section>
        <section className='mt-10'>       
            <textarea placeholder="Informação" rows={10} className="bg-gray-400/30 md:bg-white w-full py-2 md:py-3 px-8 rounded-lg border-blue-500 border-2" onChange={(e) => setinformacao(e.target.value)}></textarea>
        </section>
        <section className='mt-10 w-11/12 items-center flex'>
            <button className='m-auto w-10/12 md:w-4/12 py-3 text-white bg-[#3B82F6] rounded-lg ' onClick={handleEnv}>Criar Curso</button>
        </section>

      </div>
    
      </div>
  )
}

export default Page