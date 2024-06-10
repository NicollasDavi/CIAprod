"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import AsideBar from "../../components/AsideBar";
import Header from "../../components/Header";
import { RenderProvider } from '../context/renderContext';
import MobileAsideBar from "@/src/components/MobileAside";
import { useEffect, useState } from "react";
import BugAreaWrapper from "@/src/components/buttons/BugAreaWrapper";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [stateOfRide, setStateOfRide] = useState(false)
  useEffect(() => {
    console.log(stateOfRide)
  }, [stateOfRide])
  return (
    <html lang="pt-br">
      <body className="">
        <RenderProvider >
          <Header onFinishRide={setStateOfRide}/>
          <AsideBar onFinishRide={stateOfRide} setFinishRide={setStateOfRide}/>
          <MobileAsideBar />
          <div className="pt-5">{children}<BugAreaWrapper /></div>
        </RenderProvider>
      </body>
    </html>
  );
}
