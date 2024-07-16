import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { WEATHER_API_URL, WEATHER_API_KEY, CITY_ID, API_URL } from '../config';
import { addDays, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';
import '../components/styles/Home.css';
import Grafica_Air from './Grafica_Air';
import locationIcon from '../components/imagenes/12.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Modal from 'react-modal';
import Pronostico from './Pronostico';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

Modal.setAppElement('#root'); // Establecer el elemento raíz para accesibilidad

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);
  const [currentAirQuality, setCurrentAirQuality] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [historicalYearData, setHistoricalYearData] = useState([]);
  const [historicalMonthData, setHistoricalMonthData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

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

  useEffect(() => {
    const fetchAirQualityData = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      console.log('Selected date:', formattedDate);

      try {
        const response = await axios.get(`http://localhost:8000/api/calidad_aire/${formattedDate}/`);
        console.log('API response:', response.data);
        setAirQualityData(response.data);
        setChartData([response.data]);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchAirQualityData();
  }, [selectedDate]);

  useEffect(() => {
    const fetchCurrentAirQuality = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCurrentAirQuality(data.data.current.pollution);
      } catch (error) {
        console.error('Error fetching current air quality data:', error);
      }
    };

    fetchCurrentAirQuality();
  }, []);
  

  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return '#00e400';
    if (aqi <= 100) return '#ffff00';
    if (aqi <= 150) return '#ff7e00';
    if (aqi <= 200) return '#ff0000';
    if (aqi <= 300) return '#8f3f97';
    return '#7e0023';
  };

  const handleYearClick = async (year) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/historical_data/${year}/`);
      let data = response.data;

      // Verificar si data es un array
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      console.log('Historical API response:', data);

      // Filtrar los datos que no tienen valores NaN
      const filteredData = data.filter(item => {
        return !isNaN(item['Predicción_PM2.5']);
      });

      setHistoricalData(filteredData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setHistoricalData([]);
    }
  };
  
  
  
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = startOfDay(new Date());
      const fiveDaysFromNow = endOfDay(addDays(today, 4));
      return isBefore(date, today) || isAfter(date, fiveDaysFromNow);
    }
    return false;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const renderChart = (data, title) => {
    return <Grafica_Air data={data} title={title} />;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#historicalYearTable' });
    doc.save('historical_year_data.pdf');
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(historicalYearData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos Anuales');
    XLSX.writeFile(workbook, 'historical_year_data.xlsx');
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
            {currentAirQuality && (
              <div className="info-card-container">
                <h3>CALIDAD DEL AIRE:</h3>
                <div className="info-card" style={{ backgroundColor: getAirQualityColor(currentAirQuality.aqius) }}>
                  <p>AQI - {currentAirQuality.aqius}</p>
                </div>
              </div>
            )}
          </div>
  
          <div className="chart-info-container">
            <div className="chart-title-container">
              <h3 className="chart-title">GRAFICA DE LA CALIDAD DEL AIRE ESTA SEMANA</h3>
              <div className="chart-container">
                {chartData && <Grafica_Air data={chartData} />}
              </div>
            </div>
  
            <div className="date-picker-container">
              <h3 className="chart-title">SELECCIONE EL DÍA QUE DESEE OBSERVAR EL PRONÓSTICO</h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileDisabled={tileDisabled}
              />
              {airQualityData ? (
                <div className="forecast-day">
                  <button onClick={openModal}>Ver Pronóstico</button>
                </div>
              ) : (
                <p>No hay datos de pronóstico disponibles.</p>
              )}
            </div>
          </div>
        </div>
      </main>
  
      <div className="year-buttons-container">
        <h3 className="chart-title">SELECCIONE EL AÑO</h3>
        <div className="year-buttons">
          <button onClick={() => handleYearClick(2021)}>2021</button>
          <button onClick={() => handleYearClick(2022)}>2022</button>
          <button onClick={() => handleYearClick(2023)}>2023</button>
          <button onClick={() => handleYearClick(2024)}>2024</button>
        </div>
        {historicalData.length > 0 ? (
          <div className="chart-container">
            <Grafica_Air data={historicalData} />
          </div>
        ) : (
          <p>No hay datos disponibles para el año seleccionado.</p>
        )}
      </div>
  
      <div className="yearly-chart-container">
        <h3 className="chart-title">Datos Históricos del Año</h3>
        {renderChart(historicalYearData, 'Datos Anuales')}
        <button onClick={downloadPDF}>Descargar PDF</button>
        <button onClick={downloadExcel}>Descargar Excel</button>
      </div>
  
      <div className="monthly-chart-container">
        <h3 className="chart-title">Datos Históricos del Mes</h3>
        {renderChart(historicalMonthData, 'Datos Mensuales')}
      </div>
  
      <section className="blog-section">
        <div className="blog-posts">
          <div className="blog-post">
            <img src="https://www.24cdmx.com/content/images/size/w1200/2023/06/Dise-o-sin-t-tulo--93--1.png" alt="¿Cómo afecta la calidad del aire a la salud?" className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-post-title">¿Cómo afecta la calidad del aire a la salud?</h3>
              <p className="blog-post-content">La mala calidad del aire puede causar enfermedades respiratorias, cardiovasculares y otros problemas de salud. Es importante conocer los niveles de contaminación y tomar medidas para protegerse.</p>
            </div>
          </div>
          <div className="blog-post">
            <img src="https://valenciaplaza.com/public/Image/2016/8/pap-10-plantas-medicinales-comestibles_NoticiaAmpliada.jpg" alt="Consejos para mejorar la calidad del aire en interiores" className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-post-title">Consejos para mejorar la calidad del aire en interiores</h3>
              <p className="blog-post-content">Usa purificadores de aire, plantas que absorban contaminantes y mantén tu hogar ventilado para mejorar la calidad del aire interior.</p>
            </div>
          </div>
          <div className="blog-post">
            <img src="https://www.24cdmx.com/content/images/size/w1200/2023/06/Dise-o-sin-t-tulo--93--1.png" alt="La calidad del aire en la Ciudad de México" className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-post-title">La calidad del aire en la Ciudad de México</h3>
              <p className="blog-post-content">La CDMX tiene uno de los niveles de contaminación más altos del mundo. Conoce las medidas que se están tomando para mejorar la calidad del aire en la ciudad.</p>
            </div>
          </div>
        </div>
      </section>
  
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
  
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Pronostico Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <Pronostico airQualityData={airQualityData} chartData={chartData} onBack={closeModal} />
      </Modal>
    </div>
  );
  
  
  
  
  
}  
export default Home;
