"use client";
import { useEffect, useState } from 'react';
import NotificationCarousel from './Notifications/NotificationCarousel';
import axiosInstance from "../app/axiosInstance";
import UserCard from "./UserCard";
import { useRouter } from 'next/navigation';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const [avisos, setAvisos] = useState([]);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [mostrarCard, setMostrarCard] = useState(false);
  const [email, setEmail] = useState("Email ainda não cadastrado");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    axiosInstance.get("/alerts").then(response => {
      setAvisos(response.data);
    });
  }, []);

  useEffect(() => {
    const nomeLocal = localStorage.getItem('nome');
    const matriculaLocal = localStorage.getItem('matricula');

    if (matriculaLocal) {
      axiosInstance.get(`/user/${matriculaLocal}`).then((response) => {
        const foundUser = response.data.findedUser;
        console.log("Found User:", foundUser); // Log the found user data
        setEmail(foundUser.email || "Email ainda não cadastrado");
        setFoto(foundUser.foto || "");
        setNome(foundUser.nome || "Usuário");
        setMatricula(matriculaLocal);
      }).catch(error => {
        console.error("Erro ao carregar os dados do usuário:", error);
      });
    }
  }, []);

  return (
    <div className='w-full fixed z-40 bg-white md:block'>
      <div className='md:ml-10 ml-5 md:py-2 py-2 flex flex-row items-center'>
        <section className='ml-auto md:mr-20 mr-5 text-xl md:flex w-4/12 rounded-xl hidden'>
          <NotificationCarousel items={avisos} />
        </section>
        <section 
          className='ml-auto md:mr-20 mr-5 text-xl flex relative' 
          onMouseEnter={() => setMostrarCard(true)} 
          onMouseLeave={() => setMostrarCard(false)}
        >
          <h1 className='ml-5 pt-1'>Olá, {nome}!</h1>
          <div className="ml-10 text-4xl relative">
            {foto ? (
              <img 
                src={foto}
                alt="User Photo"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                onClick={() => router.push("/pages/userinformations")}
              />
            ) : (
              <FaUserCircle 
                onClick={() => router.push("/pages/userinformations")} 
                className="cursor-pointer text-gray-500 w-10 h-10" 
              />
            )}
            {mostrarCard && (
              <div className="absolute top-full right-[-35px] mt-2 w-64">
                <div className="bg-white rounded-md overflow-hidden transition-all duration-300 shadow-blue1 shadow-xl">
                  <UserCard matricula={matricula} nome={nome} email={email} foto={foto} />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <hr />
    </div>
  );
};

export default Header;
