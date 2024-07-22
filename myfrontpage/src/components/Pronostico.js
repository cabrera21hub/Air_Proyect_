import React from 'react';
import Grafica_Air from './Grafica_Air';
import '../components/styles/Pronostico.css';

const Pronostico = ({ airQualityData, chartData, onBack }) => {
  const getAirQualityInfo = (pm25) => {
    if (pm25 <= 12) return { level: 'Bueno', advice: 'La calidad del aire es satisfactoria y no presenta ningún riesgo para la salud.', color: '#00e400' };
    if (pm25 <= 35.4) return { level: 'Moderado', advice: 'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede haber un problema de salud moderado para un número muy reducido de personas que son especialmente sensibles a la contaminación del aire.', color: '#ffff00' };
    if (pm25 <= 55.4) return { level: 'Dañino para grupos sensibles', advice: 'Miembros de grupos sensibles pueden experimentar efectos en su salud. El público en general no es probable que se vea afectado.', color: '#ff7e00' };
    if (pm25 <= 150.4) return { level: 'Dañino', advice: 'Todos pueden comenzar a experimentar efectos en la salud; miembros de grupos sensibles pueden experimentar efectos más graves.', color: '#ff0000' };
    if (pm25 <= 250.4) return { level: 'Muy dañino', advice: 'Advertencias de salud de situaciones de emergencia. Toda la población es más probable que se vea afectada.', color: '#8f3f97' };
    return { level: 'Peligroso', advice: 'Alerta sanitaria: todos pueden experimentar efectos graves en la salud.', color: '#7e0023' };
  };

  const airQualityInfo = getAirQualityInfo(airQualityData[0]['Predicción_PM2.5']);

  return (
    <div className="pronostico-container">
      <h2>PRONOSTICO DEL DIA</h2>
      <div className="pronostico-fecha">{airQualityData[0].Fecha}</div>

      <div className="pronostico-chart-container">
        <Grafica_Air data={chartData} />
      </div>

      <div className="pronostico-info">
        <div className="pronostico-info-card">
          <div className="pronostico-aqi-container" style={{ backgroundColor: airQualityInfo.color }}>
            <p>{airQualityData[0]['Predicción_PM2.5']} µg/m³</p>
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
