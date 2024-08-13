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
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Registro del plugin Filler
);

const Grafica_Air = ({ data, title }) => {
  if (!Array.isArray(data)) {
    console.error('Expected data to be an array, but received:', data);
    return <div>No data available</div>;
  }

  // Asegúrate de que todos los elementos tengan la propiedad 'Fecha'
  const labels = data.map(item => item.Fecha ? item.Fecha.split('T')[0] : 'Fecha no disponible');
  const predictedPm25 = data.map(item => item['Predicción_PM2.5']);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Predicciones de PM2.5',
        data: predictedPm25,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 2,
        pointRadius: 4,
        fill: true,
        tension: 0.4, // Suaviza las líneas
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
          text: 'Nivel de PM2.5',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Fecha',
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
      title: {
        display: true,
        text: title,
        font: {
          size: 18
        }
      },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
      },
      line: {
        tension: 0.3,
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '500px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Grafica_Air;
