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

  // Crear un array con los días de la semana
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fechas = daysOfWeek;

  // Si hay datos de predicción, ubicarlos en el día correcto
  const predictedPm25 = new Array(7).fill(null);
  chartData.forEach(item => {
    const date = new Date(item.fecha);
    const dayIndex = date.getDay();
    predictedPm25[dayIndex] = item.predicted_pm25;
  });

  const lineData = {
    labels: fechas,
    datasets: [
      {
        label: 'Predicted PM2.5',
        data: predictedPm25,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderWidth: 2,
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: Math.min(...predictedPm25.filter(Boolean)) - 10,
        suggestedMax: Math.max(...predictedPm25.filter(Boolean)) + 10,
        title: {
          display: true,
          text: 'PM2.5 Level',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day of the Week',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Predicted PM2.5: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={lineData} options={options} />
    </div>
  );
};

export default Grafica_Air;
