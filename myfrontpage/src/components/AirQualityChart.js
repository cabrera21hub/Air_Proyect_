import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './styles/AirQualityChart.css';

const AirQualityChart = () => {
  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Calidad del Aire (AQI)',
        data: [50, 55, 60, 70, 65, 80, 90], // Simulación de datos
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Calidad del Aire de la Semana</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default AirQualityChart;
