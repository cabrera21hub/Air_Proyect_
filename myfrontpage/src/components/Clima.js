import React, { useState, useEffect } from 'react';
import './styles/Clima.css';

const Clima = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Simulación de llamada a la API
    setTimeout(() => {
      setWeatherData({
        temperature: 24,
        humidity: 50,
        condition: 'Soleado',
      });
    }, 1000);
  }, []);

  return (
    <div className="clima-container">
      <h1 className="clima-title">Predicción del Clima</h1>
      {weatherData ? (
        <div className="weather-info">
          <p>Temperatura: {weatherData.temperature}°C</p>
          <p>Humedad: {weatherData.humidity}%</p>
          <p>Condición: {weatherData.condition}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Clima;
