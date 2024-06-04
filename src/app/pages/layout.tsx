import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import AsideBar from "../../components/AsideBar";
import Header from "../../components/Header";
import { RenderProvider } from '../context/renderContext';
import MobileAsideBar from "@/src/components/MobileAside";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIA",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <RenderProvider >
          <Header />
          <AsideBar />
          <MobileAsideBar />
          <div className="pt-5">{children}</div>
        </RenderProvider>
      </body>
    </html>
  );
}
