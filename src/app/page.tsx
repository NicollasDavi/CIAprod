import Image from "next/image";
import axiosInstance from './axiosInstance';
import { useEffect, useState } from "react";

export default function Home() {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleRedirect = () => {
    const newMatricula = parseInt(matricula)
    const data = {
      matricula: newMatricula,
      senha: senha
    };

    axiosInstance.post('/login', data)
      .then(response => {
        localStorage.setItem('token', response.data.TOKEN)
        localStorage.setItem('nome', response.data.USER)
        setRedirectUrl(response.data.URL); 
      })
      .catch(error => {
          console.error('Erro:', error);
      });
  };

  useEffect(() => {
    console.log(typeof(matricula))
    console.log(typeof(senha))
    console.log(matricula)
    console.log(senha)
  }, [matricula, senha])

  return (
    <main style={{ display: "flex", minHeight: "100vh", flexDirection: "column-reverse", alignItems: "center", justifyContent: "space-between", padding: "24px", backgroundColor: "#3B82F6", color: "white" }}>
      <div style={{ textAlign: "center", backgroundColor: "white", padding: "32px", borderRadius: "1.5rem" }}>
        <div>
          <div>
            <h1 style={{ fontWeight: "800", fontSize: "1.875rem", marginBottom: "1rem" }} className="md:text-3xl mt-2 font-extrabold hidden md:block">Bem vindo de volta!</h1>
            <h2 style={{ width: "80%", margin: "auto", fontSize: "1.25rem" }} className="w-5/6 m-auto mt-4 md:block hidden">Essa é a nossa Central de Informações para Atendimento.</h2>
          </div>
          <div>
            <section >
              <input type="text" placeholder="Matrícla" style={{ backgroundColor: "rgba(249, 250, 251, 0.75)", color: "black", marginTop: "0.75rem", width: "100%", padding: "0.5rem", borderRadius: "0.75rem" }} onChange={(e) => setMatricula(e.target.value)} />
            </section>
            <section>
              <input type="text" placeholder="Senha" style={{ backgroundColor: "rgba(249, 250, 251, 0.75)", color: "black", marginTop: "0.75rem", width: "100%", padding: "0.5rem", borderRadius: "0.75rem" }} onChange={(e) => setSenha(e.target.value)} />
            </section>
            <p style={{ textAlign: "start", marginTop: "0.25rem", fontSize: "0.75rem" }} className="text-start mt-4 text-xs ml-2">Esqueceu a senha ?</p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleRedirect} style={{ backgroundColor: "#3B82F6", color: "white", fontWeight: "bold", width: "100%", padding: "0.75rem", borderRadius: "1.5rem", marginTop: "1rem", fontSize: "1.125rem" }} className="md:bg-white py-2 md:py-3 rounded-full bg-[#3B82F6] text-white md:text-[#3B82F6] font-bold w-full md:w-9/12 md:text-xl">Entrar</button>
            <p style={{ fontSize: "0.75rem", marginTop: "0.25rem" }} className="mt-4 text-xs">Primeiro Acesso?</p>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", textAlign: "center", marginRight: "0", marginLeft: "0" }}>
        <div>
            <div style={{ width: "100%", padding: "16px" }}>
              <Image alt="" src="/Branco.png" width={500} height={500} style={{ width: "100%", height: "auto", backgroundColor: "#3B82F6", padding: "32px", marginTop: "2rem", borderRadius: "1.5rem" }} />
            </div>
            <div style={{ marginTop: "2rem" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }} className="text-4xl font-bold">CIA</h1>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginTop: "0.5rem" }} className="text-4xl font-bold">Curso Positivo</h1>
              <p style={{ width: "83.333333%", margin: "auto", marginTop: "3rem" }} className="w-10/12 m-auto mt-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam maecenas mi non sed ut odio. Non, justo, sed facilisi et. Eget viverra urna, vestibulum egestas faucibus egestas. Sagittis nam velit volutpat eu nunc.</p>
            </div>
        </div>
      </div>
    </main>
  );
}
