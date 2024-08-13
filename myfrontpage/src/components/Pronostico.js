import React from 'react';
import '../components/styles/Pronostico.css';
import Grafica_Air from './Grafica_Air';

const Pronostico = ({ airQualityData, chartData, onBack }) => {
  const getAirQualityColor = (pm25) => {
    if (pm25 <= 12) return '#00e400'; // Bueno
    if (pm25 <= 35.4) return '#ffff00'; // Moderado
    if (pm25 <= 55.4) return '#ff7e00'; // No saludable para grupos sensibles
    if (pm25 <= 150.4) return '#ff0000'; // No saludable
    if (pm25 <= 250.4) return '#8f3f97'; // Muy insalubre
    return '#7e0023'; // Peligroso
  };

  const getAirQualityDescription = (pm25) => {
    if (pm25 <= 12) return 'Bueno (0-12.0): Poco o cero riesgo.';
    if (pm25 <= 35.4) return 'Moderado (12.1-35.4): Las personas sensibles pueden experimentar síntomas respiratorios.';
    if (pm25 <= 55.4) return 'No saludable para grupos vulnerables (35.5-55.4): Probabilidad de enfermedades respiratorias y cardíacas.';
    if (pm25 <= 150.4) return 'No saludable (55.5-150.4): Mayor agravamiento de enfermedades cardíacas y respiratorias.';
    if (pm25 <= 250.4) return 'Muy insalubre (150.5-250.4): Aumento significativo de enfermedades respiratorias.';
    return 'Peligroso (250.5-500.4): Riesgo serio de problemas respiratorios y cardíacos.';
  };

  const currentPm25 = airQualityData[0]['Predicción_PM2.5'];

  return (
    <div className="prediccion-wrapper">
    <div className="pronostico-container">
      <h2>Pronóstico del Día</h2>
      <div className="pm25-info" style={{ backgroundColor: getAirQualityColor(currentPm25) }}>
        <h3>PM2.5: {currentPm25.toFixed(2)} µg/m³</h3>
        <p>{getAirQualityDescription(currentPm25)}</p>
        {currentPm25 > 55.4 ? (
          <div className="contingencia">
            <h3 style={{ color: '#ff0000' }}>Contingencia Ambiental: Sí</h3>
            <p>Razón: Los niveles de PM2.5 están por encima del rango aceptable, lo que implica un riesgo para la salud.</p>
          </div>
        ) : (
          <div className="contingencia">
            <h3>Contingencia Ambiental: No</h3>
            <p>Razón: Los niveles de PM2.5 están dentro del rango aceptable para la mayoría de las personas.</p>
          </div>
        )}
      </div>
      <div className="chart-container">
        <Grafica_Air data={chartData} />
      </div>
      <button onClick={onBack}>Cerrar</button>
    </div>
    </div>
  );
};

export default Pronostico;
