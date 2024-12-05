import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomAirQualityChart = () => {
  const data = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ozono',
        data: [20, 30, 40, 50, 60, 70, 80],
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        fill: false,
      },
      {
        label: 'Monóxido de carbono',
        data: [10, 20, 30, 40, 50, 60, 70],
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'Dióxido de azufre',
        data: [15, 25, 35, 45, 55, 65, 75],
        borderColor: '#FFCE56',
        backgroundColor: '#FFCE56',
        fill: false,
      },
      {
        label: 'Dióxido de nitrógeno',
        data: [5, 15, 25, 35, 45, 55, 65],
        borderColor: '#4BC0C0',
        backgroundColor: '#4BC0C0',
        fill: false,
      },
      {
        label: 'Partículas suspendidas',
        data: [30, 40, 50, 60, 70, 80, 90],
        borderColor: '#9966FF',
        backgroundColor: '#9966FF',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Mantiene la relación de aspecto del gráfico
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#000', // Color del texto de la leyenda en negro
        },
      },
      title: {
        display: true,
        text: 'Calidad del Aire esta Semana',
        color: '#000', // Color del título en negro
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000', // Color de las etiquetas del eje X en negro
        },
      },
      y: {
        ticks: {
          color: '#000', // Color de las etiquetas del eje Y en negro
        },
      },
    },
  };

  return <Line data={data} options={options} height={200} />;
};

export default CustomAirQualityChart;
