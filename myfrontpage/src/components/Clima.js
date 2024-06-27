import React, { useState, useEffect } from 'react';
import { WEATHER_API_URL, WEATHER_API_KEY, CITY_ID } from '../config';
import './styles/Clima.css';

const Clima = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${WEATHER_API_URL}?id=${CITY_ID}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="clima-container">
      <h1 className="clima-title">Predicción del Clima</h1>
      {weatherData ? (
        <div className="weather-info">
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
          <p>Condición: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Clima;
