import React, { useState, useEffect } from 'react';
import AirQualityChart from './AirQualityChart';
import { WEATHER_API_URL, WEATHER_API_KEY, CITY_ID } from '../config';
import '..//components/styles/Home.css';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);

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

    const fetchForecastData = async () => {
      try {
        const response = await fetch(`${WEATHER_API_URL}/forecast?id=${CITY_ID}&appid=${WEATHER_API_KEY}&units=metric&cnt=40`);
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    const fetchAirQualityData = async () => {
      try {
        const response = await fetch('http://api.airvisual.com/v2/city?city=Mexico City&state=Mexico City&country=Mexico&key=12bc6a9b-50e4-4db3-94ed-58d30440af97');
        const data = await response.json();
        setAirQualityData(data.data.current.pollution);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    Promise.all([fetchWeatherData(), fetchForecastData(), fetchAirQualityData()]).then(() => setLoading(false));
  }, []);

  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return '#00e400';
    if (aqi <= 100) return '#ffff00';
    if (aqi <= 150) return '#ff7e00';
    if (aqi <= 200) return '#ff0000';
    if (aqi <= 300) return '#8f3f97';
    return '#7e0023';
  };

  const getAirQualityText = (aqi) => {
    if (aqi <= 50) return 'Bueno';
    if (aqi <= 100) return 'Moderado';
    if (aqi <= 150) return 'Dañino para grupos sensibles';
    if (aqi <= 200) return 'Dañino';
    if (aqi <= 300) return 'Muy dañino';
    return 'Peligroso';
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Calidad del Aire en Ciudad de México</h1>
      </div>

      <div className="data-summary">
        <div className="data-item">
          <span className="data-value">{weatherData?.main?.temp ?? '--'}°C</span>
          <span className="data-label">Temperatura</span>
        </div>
        <div className="data-item">
          <span className="data-value">{weatherData?.main?.humidity ?? '--'}%</span>
          <span className="data-label">Humedad</span>
        </div>
        <div className="data-item">
          <span className="data-value">{airQualityData?.aqius ?? '--'}</span>
          <span className="data-label">AQI</span>
        </div>
      </div>

      <div className="air-quality-container" style={{ backgroundColor: airQualityData ? getAirQualityColor(airQualityData.aqius) : '#fff' }}>
        <h1 className="air-quality-title">Calidad del Aire Actual</h1>
        {airQualityData ? (
          <div className="air-quality-info">
            <p>AQI: {airQualityData.aqius}</p>
            <p>Estado: {getAirQualityText(airQualityData.aqius)}</p>
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>

      <div className="clima-map-container">
        <div className="map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.789292316303!2d-99.14063268562243!3d19.432606986891597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92b7f29b9e5%3A0x46edb3d410a64a5d!2sZ%C3%B3calo%2C%20Plaza%20de%20la%20Constituci%C3%B3n%2C%20Centro%2C%20Cuauht%C3%A9moc%2C%2006000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses!2sus!4v1629129129457!5m2!1ses!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="air-quality-chart">
          <AirQualityChart />
        </div>
      </div>

      <div className="forecast-container">
        <h1 className="forecast-title">Pronóstico de 5 Días</h1>
        {forecastData ? (
          <div className="forecast-info">
            {forecastData.list?.slice(0, 5).map((day, index) => (
              <div key={index} className="forecast-item">
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temperatura Máx: {day.main.temp_max}°C</p>
                <p>Temperatura Mín: {day.main.temp_min}°C</p>
                <p>Condición: {day.weather[0].description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Cargando datos del pronóstico...</p>
        )}
      </div>

      <div className="forecast-container">
        <h1 className="forecast-title">Pronóstico de 24 Horas</h1>
        {forecastData ? (
          <div className="forecast-info">
            {forecastData.list?.slice(0, 24).map((hour, index) => (
              <div key={index} className="forecast-item">
                <p>{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                <p>Temperatura: {hour.main.temp}°C</p>
                <p>Condición: {hour.weather[0].description}</p>
                <p>Viento: {hour.wind.speed} m/s</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Cargando datos del pronóstico...</p>
        )}
      </div>

      <div className="forecast-container">
        <h1 className="forecast-title">Pronóstico para Mañana</h1>
        {forecastData?.list ? (
          <div className="forecast-info">
            <p>Condición: {forecastData.list[8].weather[0].description}</p>
            <p>Temperatura Máx: {forecastData.list[8].main.temp_max}°C</p>
            <p>Temperatura Mín: {forecastData.list[8].main.temp_min}°C</p>
          </div>
        ) : (
          <p>Cargando datos del pronóstico...</p>
        )}
      </div>

      <div className="contact-container">
        <h2 className="contact-title">Comunícate con Nosotros</h2>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
