"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { MdCalculate } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { BiSolidData } from "react-icons/bi";
import { PiNewspaperFill } from "react-icons/pi";
import axiosInstance from "../app/axiosInstance";
import { useRenderContext } from "../app/context/renderContext";
import JoyrideComponent from "./Joyride/JoyrideComponent ";
import { TbLetterN } from "react-icons/tb";

interface AsideBarProps {
  onFinishRide: boolean;
  setFinishRide: (isFinished: boolean) => void;
}

const AsideBar = ({ onFinishRide, setFinishRide }: AsideBarProps) => {
  const { admin, isN } = useRenderContext();
  const [startRide, setStartRide] = useState(false);

  useEffect(() => {
    setStartRide(onFinishRide);
  }, [onFinishRide]);

  const handleLogOut = () => {
    const matricula = 105404;
    axiosInstance
      .post(`/logout/${matricula}`)
      .then((response) => {
        console.log("saiu");
        localStorage.removeItem("token");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };
  console.log("isN é: ", localStorage.getItem("isN"));

  const [{ steps }, setState] = useState({
    steps: [
      {
        title: "Pagina Home",
        target: ".Home",
        content: "Esse icone ira te redirecionar para a pagina inicial",
        disableBeacon: true,
      },
      {
        title: "Pagina de Informações",
        target: ".Info",
        content:
          "Essa pagina guarda as principais informações do Curso Positivo para você",
        disableBeacon: true,
      },
      {
        title: "Pagina de documentos",
        target: ".Doc",
        content:
          "Essa pagina guarda os documentos publicos e seus documentos personalizados",
        disableBeacon: true,
      },
      {
        title: "Calculadora",
        target: ".Calc",
        content:
          "A calculadora CIA pode calcular e gerar descontos de uma maneira rapida e facil!",
        disableBeacon: true,
      },
      {
        title: "Gerenciador de dados",
        target: ".Data",
        content:
          "Aqui o Administrador podera gerir as informações e criar novas",
        disableBeacon: true,
      },
      {
        title: "Aréa de divulgações",
        target: ".Com",
        content:
          "Area dedicada para a inclusão e gerenciamento das informações divulgadas",
        disableBeacon: true,
      },
      {
        title: "Log out",
        target: ".Log",
        content: "Aqui você podera se desconectar",
        disableBeacon: true,
      },
    ],
  });
  const handleJoyrideFinish = () => {
    setFinishRide(false);
  };
  const handleJoyrideStart = () => {};

  return (
    <div className="md:flex hidden h-screen w-1/12 fixed left-0 z-50">
      {startRide && (
        <JoyrideComponent
          steps={steps}
          run={startRide}
          onStart={handleJoyrideStart}
          setFinish={handleJoyrideFinish}
        />
      )}

      <div className="bg-[#3B82F6] w-full h-full flex flex-col items-center">
        <section className="pt-4" title="Logo CIA">
          <Image
            alt="Logo CIA"
            src="/Branco.png"
            width={500}
            height={500}
            className="w-auto h-16 m-auto"
          />
          <hr className="mt-3" />
        </section>
        <nav className="flex-1 flex flex-col items-center mt-20 space-y-8">
          <Link href="/pages/home" className="text-4xl text-white Home" title="Home">
            <TiHome />
          </Link>
          <Link
            href="/pages/infos"
            className="text-4xl text-white Info"
            title="Area de informações"
          >
            <FaInfo />
          </Link>
          <Link
            href="/pages/docs"
            className="text-4xl text-white Doc"
            title="Area de Docs"
          >
            <SiGoogledocs />
          </Link>
          <Link
            href="/pages/calculadora"
            className="text-4xl text-white Calc"
            title="Calculadora"
          >
            <MdCalculate />
          </Link>
          {admin && (
            <>
              <Link
                href="/pages/datalist"
                className="text-4xl text-white Data"
                title="Data List"
              >
                <BiSolidData />
              </Link>
              <Link
                href="/pages/comunicacao"
                className="text-4xl text-white Com"
                title="Comunicações"
              >
                <PiNewspaperFill />
              </Link>
            </>
          )}
          {isN && (
            <Link
              href="/pages/nicpower"
              className="text-4xl text-white Com"
              title="Comunicações"
            >
              <TbLetterN />
            </Link>
          )}
        </nav>
        <section className="w-full">
          <div className="fixed bottom-5 left-0 right-0 text-white text-center p-4 w-1/12">
            <hr className="mb-4" />
            <button onClick={handleLogOut} className="text-4xl Log">
              <CiLogout />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AsideBar;
