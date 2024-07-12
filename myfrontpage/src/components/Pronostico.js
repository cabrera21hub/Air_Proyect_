import React from 'react';
import Grafica_Air from './Grafica_Air';
import '../components/styles/Pronostico.css';

const Pronostico = ({ airQualityData, chartData, onBack }) => {
  const getAirQualityInfo = (aqi) => {
    if (aqi <= 50) return { level: 'Bueno', advice: 'La calidad del aire es satisfactoria y no presenta ningún riesgo para la salud.' };
    if (aqi <= 100) return { level: 'Moderado', advice: 'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede haber un problema de salud moderado para un número muy reducido de personas que son especialmente sensibles a la contaminación del aire.' };
    if (aqi <= 150) return { level: 'Dañino para grupos sensibles', advice: 'Miembros de grupos sensibles pueden experimentar efectos en su salud. El público en general no es probable que se vea afectado.' };
    if (aqi <= 200) return { level: 'Dañino', advice: 'Todos pueden comenzar a experimentar efectos en la salud; miembros de grupos sensibles pueden experimentar efectos más graves.' };
    if (aqi <= 300) return { level: 'Muy dañino', advice: 'Advertencias de salud de situaciones de emergencia. Toda la población es más probable que se vea afectada.' };
    return { level: 'Peligroso', advice: 'Alerta sanitaria: todos pueden experimentar efectos graves en la salud.' };
  };

  const airQualityInfo = getAirQualityInfo(airQualityData.aqi);

  return (
    <div className="pronostico-container">
      <h2>PRONOSTICO DEL DIA</h2>
      <div className="pronostico-fecha">{airQualityData.fecha}</div>

      <div className="pronostico-chart-container">
        <Grafica_Air data={chartData} />
      </div>

      <div className="pronostico-info">
        <div className="pronostico-info-card">
          <div className="pronostico-aqi-container">
            <p>{airQualityData.aqi} AQI</p>
            <p>{airQualityInfo.level}</p>
          </div>
          <div className="pronostico-consejos">
            <h3>Consejos:</h3>
            <ul>
              <li>{airQualityInfo.advice}</li>
              <li>Evite salir si no es necesario.</li>
              <li>Use mascarilla al aire libre.</li>
              <li>Evite realizar ejercicios al aire libre.</li>
            </ul>
          </div>
        </div>
      </div>

      <button className="pronostico-boton" onClick={onBack}>Regresar</button>
    </div>
  );
};

export default Pronostico;
