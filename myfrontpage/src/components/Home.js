import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import AirQualityScale from './AirQualityScale';
import AirQualityChart from './AirQualityChart';

const Home = () => {
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
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Bienvenido a la App de Calidad del Aire</h1>
        <p className="home-text">Consulta la calidad del aire en tu ciudad y recibe predicciones diarias.</p>
      </div>
      
      <AirQualityScale />

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
      </div>

      <AirQualityChart />

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
