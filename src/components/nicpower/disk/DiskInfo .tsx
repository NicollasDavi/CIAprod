"use client"
import React, { useEffect, useState } from 'react';
import axiosInstance from "../../../app/axiosInstance";
import { Chart } from "react-google-charts";

const DiskInfo = () => {
  const [diskInfo, setDiskInfo] = useState({
    total: 0,
    used: 0,
    free: 0
  });

  useEffect(() => {
    axiosInstance.get('/disk')
      .then((response) => {
        console.log(response.data);
        setDiskInfo(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter informações do disco:', error);
      });
  }, []);

  const formatSizeGB = (sizeInGB: number) => {
    return sizeInGB.toFixed(2) + ' GB';
  };

  const chartData = [
    ['Tipo', 'Tamanho'],
    ['Usado', diskInfo.used],
    ['Livre', diskInfo.free]
  ];

  const options = {
    title: "Espaço em disco",
    pieHole: 0.4,
    is3D: false,
    backgroundColor: 'transparent',
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-md">
      <div className="grid grid-cols-2">
        <div>
        <h2 className="text-2xl font-bold mb-4">Informações do Disco</h2>
          <p><strong>Total:</strong> {formatSizeGB(diskInfo.total)}</p>
          <p><strong>Usado:</strong> {formatSizeGB(diskInfo.used)}</p>
          <p><strong>Livre:</strong> {formatSizeGB(diskInfo.free)}</p>
        </div>
        <div className="flex">
          <Chart
            width={'400px'} 
            height={'300px'} 
            chartType="PieChart"
            loader={<div>Carregando gráfico...</div>}
            data={chartData}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default DiskInfo;