import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { WEATHER_API_URL, WEATHER_API_KEY, CITY_ID } from '../config';
import '../components/styles/Home.css';
import Grafica_Air from './Grafica_Air';
import locationIcon from '../components/imagenes/12.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);

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

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    console.log('Selected date:', formattedDate);

    try {
      const response = await axios.get(`http://localhost:8000/api/calidad_aire/${formattedDate}`);
      console.log('API response:', response.data);
      setAirQualityData(response.data);
      setChartData(response.data); // Si necesitas los datos en chartData también
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      setAirQualityData(null);
    }
  };

  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return '#00e400';
    if (aqi <= 100) return '#ffff00';
    if (aqi <= 150) return '#ff7e00';
    if (aqi <= 200) return '#ff0000';
    if (aqi <= 300) return '#8f3f97';
    return '#7e0023';
  };

  return (
    <div className="home-container">
      <main className="content">
        <div className="left-side">
          <div className="title-container">
            <img src={locationIcon} alt="Location" className="location-icon" />
            <h1 className="city-title">CIUDAD DE MEXICO</h1>
          </div>
          <h2 className="air-quality-title">¿CALIDAD DEL AIRE?</h2>
          <p className="description">La calidad del aire mide qué tan limpio o contaminado está el aire que respiramos. Factores como el humo de los vehículos, las fábricas y el polvo pueden afectar nuestra salud.</p>

          <div className="map-container">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.789292316303!2d-99.14063268562243!3d19.432606986891597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92b7f29b9e5%3A0x46edb3d410a64a5d!2sZ%C3%B3calo%2C%20Plaza%20de%20la%20Constituci%C3%B3n%2C%20Centro%2C%20Cuauht%C3%A9moc%2C%2006000%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20M%C3%A9xico!5e0!3m2!1ses!2sus!4v1629129129457!5m2!1ses!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div className="date-picker-container">
            <DatePicker selected={selectedDate} onChange={handleDateChange} />
          </div>

          <p className="faq">
            <Link to="/faq">PREGUNTAS FRECUENTES</Link>
          </p>
        </div>

        <div className="right-side">
          <div className="info-cards-container">
            {weatherData && (
              <>
                <div className="info-card-container">
                  <h3>TEMPERATURA:</h3>
                  <div className="info-card">
                    <p>{weatherData.main.temp.toFixed(2)}°C</p>
                  </div>
                </div>
                <div className="info-card-container">
                  <h3>HUMEDAD:</h3>
                  <div className="info-card">
                    <p>{weatherData.main.humidity} %</p>
                  </div>
                </div>
              </>
            )}
            {airQualityData && (
              <div className="info-card-container">
                <h3>CALIDAD DEL AIRE:</h3>
                <div className="info-card" style={{ backgroundColor: getAirQualityColor(airQualityData.aqius) }}>
                  <p>{airQualityData.aqius} AQI - {airQualityData.mainus}</p>
                </div>
              </div>
            )}
          </div>

          <div className="chart-info-container">
            <div className="chart-container">
              {chartData && <Grafica_Air data={chartData} />}
            </div>

            <div className="quality-info">
              <h4 className="quality-title">ACEPTABLE</h4>
              <p>Contaminante(s): O3, PM2.5</p>
              <p>Riesgo: MODERADO</p>
              <p>Recomendaciones para:</p>
              <ul>
                <li>Grupo Sensibles: Considera reducir las actividades físicas vigorosas al aire libre.</li>
                <li>Para toda la población: Disfruta las actividades al aire libre.</li>
              </ul>
              <p>Índice anterior:</p>
              <p>Regular</p>
              <p>Contaminante: PM2.5</p>
              <p>Índice: 62</p>
              <p>Estación: CAM-Camarones</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="social-media-footer">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
