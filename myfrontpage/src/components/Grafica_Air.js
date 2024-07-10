import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Grafica_Air = ({ data }) => {
  // Verificar si data es un array o un objeto
  const chartData = Array.isArray(data) ? data : [data];

  const fechas = chartData.map(item => item.fecha);
  const realPm25 = chartData.map(item => item.real_pm25);
  const predictedPm25 = chartData.map(item => item.predicted_pm25);

  const lineData = {
    labels: fechas,
    datasets: [
      {
        label: 'Real PM2.5',
        data: realPm25,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Predicted PM2.5',
        data: predictedPm25,
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <Line data={lineData} />
    </div>
  );
};

export default Grafica_Air;
