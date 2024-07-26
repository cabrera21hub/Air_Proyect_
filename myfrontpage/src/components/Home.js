import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { WEATHER_API_URL, WEATHER_API_KEY, CITY_ID } from '../config';
import { addDays, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';
import jsPDF from 'jspdf';
import locationIcon from '../components/imagenes/12.webp';
import '../components/styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Modal from 'react-modal';
import Pronostico from './Pronostico';
import * as XLSX from 'xlsx';
import Grafica_Air from './Grafica_Air';

Modal.setAppElement('#root');

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);
  const [currentPm25, setCurrentPm25] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      const today = new Date().toISOString().split('T')[0];
      try {
        const response = await axios.get(`https://air-proyect-olmf.onrender.com/api/calidad_aire/${today}/`);
        const data = response.data;
        console.log('PM2.5 API response:', data);
        if (data.length > 0 && typeof data[0]['Predicción_PM2.5'] === 'number') {
          setCurrentPm25(data[0]['Predicción_PM2.5']);
        } else {
          console.error('PM2.5 data is not available or not a number:', data);
          setCurrentPm25(null);
        }
      } catch (error) {
        console.error('Error fetching current PM2.5 data:', error);
      }
    };

    fetchAirQualityData();
  }, []);

  useEffect(() => {
    const fetchSelectedDateAirQualityData = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      console.log('Selected date:', formattedDate);

      try {
        const response = await axios.get(`https://air-proyect-olmf.onrender.com/api/calidad_aire/${formattedDate}/`);
        console.log('API response:', response.data);
        setAirQualityData(response.data);
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchSelectedDateAirQualityData();
  }, [selectedDate]);

  useEffect(() => {
    handleYearClick(2024);
  }, []);

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

  const handleYearClick = async (year) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/historical_data/${year}/`);
      let data = response.data;

      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      console.log('Historical API response:', data);

      const today = new Date();
      const filteredData = data.filter(item => {
        const itemDate = new Date(item.Fecha);
        return !isNaN(item['Predicción_PM2.5']) && itemDate <= today;
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

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Reporte de Calidad del Aire', 105, 20, null, null, 'center');

    doc.setFontSize(16);
    doc.text(`Fecha: ${selectedDate.toLocaleDateString()}`, 105, 40, null, null, 'center');

    if (currentPm25 !== null) {
      doc.setFontSize(14);
      doc.text(`Pronóstico de PM2.5: ${currentPm25.toFixed(2)} µg/m³`, 105, 50, null, null, 'center');

      const description = getAirQualityDescription(currentPm25);
      doc.text(description, 10, 70, { maxWidth: 190 });

      if (currentPm25 > 55.4) {
        doc.setTextColor(255, 0, 0);
        doc.text('Contingencia Ambiental: Sí', 10, 90);
        doc.setTextColor(0, 0, 0);
        doc.text('Razón: Los niveles de PM2.5 están por encima del rango aceptable, lo que implica un riesgo para la salud.', 10, 100, { maxWidth: 190 });
      } else {
        doc.text('Contingencia Ambiental: No', 10, 90);
        doc.text('Razón: Los niveles de PM2.5 están dentro del rango aceptable para la mayoría de las personas.', 10, 100, { maxWidth: 190 });
      }

      doc.text('Recomendaciones:', 10, 120);
      doc.setFontSize(12);
      const recommendations = [
        '- Evita actividades al aire libre.',
        '- Usa mascarillas adecuadas si es necesario salir.',
        '- Mantén las ventanas cerradas.'
      ];
      recommendations.forEach((rec, i) => {
        doc.text(rec, 10, 130 + i * 10);
      });
    } else {
      doc.setFontSize(14);
      doc.text('No hay datos disponibles para el pronóstico de PM2.5.', 105, 60, null, null, 'center');
    }

    doc.save('reporte_calidad_aire.pdf');
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(historicalData);
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
                {currentPm25 !== null && (
                  <div className="info-card-container">
                    <h3>PM2.5 (Predicción):</h3>
                    <div className="info-card pm25-card" style={{ backgroundColor: getAirQualityColor(currentPm25) }}>
                      <p>{currentPm25.toFixed(2)} µg/m³</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="chart-info-container">
            <div className="chart-title-container">
              <h3 className="chart-title">GRAFICA DE LA CALIDAD DEL AIRE ESTA SEMANA</h3>
              <div className="chart-container-large">
                {chartData && <Grafica_Air data={chartData} />}
              </div>
            </div>

            <div className="date-picker-container">
              <h3 className="chart-title">SELECCIONE EL DÍA QUE DESEE OBSERVAR EL PRONÓSTICO</h3>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileDisabled={tileDisabled}
                className="custom-calendar"
              />
              {airQualityData ? (
                <div className="forecast-day">
                  <button onClick={openModal}>Ver Pronóstico</button>
                  <button onClick={generatePDF}>Generar Reporte</button>
                </div>
              ) : (
                <p>No hay datos de pronóstico disponibles.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="chart-and-scale-container">
        <div className="chart-container">
          <h3 className="chart-title" style={{ color: '#000' }}>Datos Históricos del Año 2024</h3>
          <div className="year-buttons">
            <button onClick={() => handleYearClick(2021)}>2021</button>
            <button onClick={() => handleYearClick(2022)}>2022</button>
            <button onClick={() => handleYearClick(2023)}>2023</button>
            <button onClick={() => handleYearClick(2024)}>2024</button>
          </div>
          {historicalData.length > 0 ? (
            <Grafica_Air data={historicalData} />
          ) : (
            <p>No hay datos disponibles para el año seleccionado.</p>
          )}
          <button onClick={downloadExcel}>Descargar Excel</button>
        </div>

        <div className="scale-container">
          <h3 className="scale-title">Escala de Calidad del Aire (PM2.5)</h3>
          <div className="scale-item" style={{ backgroundColor: '#00e400', color: '#000' }}>
            <p className="level">Bueno (0-12.0)</p>
            <p className="advice">Poco o cero riesgo.</p>
          </div>
          <div className="scale-item" style={{ backgroundColor: '#ffff00', color: '#000' }}>
            <p className="level">Moderado (12.1-35.4)</p>
            <p className="advice">Las personas sensibles pueden experimentar síntomas respiratorios.</p>
          </div>
          <div className="scale-item" style={{ backgroundColor: '#ff7e00', color: '#000' }}>
            <p className="level">No saludable para grupos vulnerables (35.5-55.4)</p>
            <p className="advice">Probabilidad de enfermedades respiratorias y cardíacas.</p>
          </div>
          <div className="scale-item" style={{ backgroundColor: '#ff0000', color: '#fff' }}>
            <p className="level">No saludable (55.5-150.4)</p>
            <p className="advice">Mayor agravamiento de enfermedades cardíacas y respiratorias.</p>
          </div>
          <div className="scale-item" style={{ backgroundColor: '#8f3f97', color: '#fff' }}>
            <p className="level">Muy insalubre (150.5-250.4)</p>
            <p className="advice">Aumento significativo de enfermedades respiratorias.</p>
          </div>
          <div className="scale-item" style={{ backgroundColor: '#7e0023', color: '#fff' }}>
            <p className="level">Peligroso (250.5-500.4)</p>
            <p className="advice">Riesgo serio de problemas respiratorios y cardíacos.</p>
          </div>
        </div>
      </div>

      <section className="additional-info">
        <h2 className="additional-info-title">Información Adicional Sobre la Calidad del Aire</h2>
        <div className="additional-info-content">
          <div className="additional-info-item">
            <h3>¿Qué es PM2.5?</h3>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/63/PM_and_a_human_hair.jpg" alt="PM2.5" className="additional-info-image" />
            <p>El PM2.5 se refiere a partículas microscópicas en el aire con un diámetro de 2.5 micrómetros o menos. Estas partículas son lo suficientemente pequeñas como para penetrar profundamente en los pulmones y entrar en el torrente sanguíneo, lo que puede causar problemas de salud graves.</p>
          </div>
          <div className="additional-info-item">
            <h3>¿Cómo afecta la calidad del aire a la salud?</h3>
            <img src="https://integralatampost.s3.amazonaws.com/uploads/article/picture/32737/2022-09-06_09_512022-09-06_09_4620220907_Como-afecta-a-tu-salud-la-calidad-del-aire-que-respiras.jpg" alt="Salud y aire" className="additional-info-image" />
            <p>La mala calidad del aire puede causar enfermedades respiratorias, cardiovasculares y otros problemas de salud. Es importante conocer los niveles de contaminación y tomar medidas para protegerse.</p>
          </div>
          <div className="additional-info-item">
            <h3>Consejos para mejorar la calidad del aire en interiores</h3>
            <img src="https://fotografias.antena3.com/clipping/cmsimages02/2023/02/21/DDDF1FAB-E7BD-4EFF-AA2D-8B01B7884BE6/trucos-mejorar-calidad-aire-casa-evitar-problemas-salud_98.jpg?crop=1000,563,x0,y126&width=1900&height=1069&optimize=high&format=webply" alt="Aire interior" className="additional-info-image" />
            <p>Usa purificadores de aire, plantas que absorban contaminantes y mantén tu hogar ventilado para mejorar la calidad del aire interior.</p>
          </div>
          <div className="additional-info-item">
            <h3>La calidad del aire en la Ciudad de México</h3>
            <img src="https://www.portalambiental.com.mx/sites/default/files/media/image/2019/05/contaminacion_del_aire_cdmx_1605_-3.jpg" alt="CDMX aire" className="additional-info-image" />
            <p>La CDMX tiene uno de los niveles de contaminación más altos del mundo. Conoce las medidas que se están tomando para mejorar la calidad del aire en la ciudad.</p>
          </div>
          <div className="additional-info-item">
            <h3>Impacto de la contaminación del aire en niños y ancianos</h3>
            <img src="https://www.uninorte.edu.co/documents/13400067/25028114/enfermedad-respiratoria.jpeg/711e0d77-08bc-750f-62f4-fc1799e15dd6?t=1652764762366" alt="Impacto en niños y ancianos" className="additional-info-image" />
            <p>Los niños y los ancianos son más susceptibles a los efectos de la contaminación del aire. Es fundamental monitorear la calidad del aire y tomar precauciones adicionales para proteger a estos grupos vulnerables.</p>
          </div>
          <div className="additional-info-item">
            <h3>Medidas para reducir la exposición al PM2.5</h3>
            <img src="https://www.pranaair.com/wp-content/uploads/2021/08/sources-of-pm2.5.png" alt="Reducir exposición" className="additional-info-image" />
            <p>Evita actividades al aire libre en días con altos niveles de PM2.5, usa mascarillas adecuadas y purificadores de aire en interiores para reducir la exposición.</p>
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
        {airQualityData && (
          <Pronostico airQualityData={airQualityData} chartData={chartData} onBack={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Home;
