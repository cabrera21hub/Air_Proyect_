import React from 'react';
import '../components/styles/AirQualityScale.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const AirQualityScale = () => {
  const scale = [
    { level: 'Bueno', range: '0-50', color: '#00e400', advice: 'La calidad del aire es satisfactoria y no presenta ningún riesgo para la salud.' },
    { level: 'Moderado', range: '51-100', color: '#ffff00', advice: 'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede haber un problema de salud moderado para un número muy reducido de personas que son especialmente sensibles a la contaminación del aire.' },
    { level: 'Dañino para grupos sensibles', range: '101-150', color: '#ff7e00', advice: 'Miembros de grupos sensibles pueden experimentar efectos en su salud. El público en general no es probable que se vea afectado.' },
    { level: 'Dañino', range: '151-200', color: '#ff0000', advice: 'Todos pueden comenzar a experimentar efectos en la salud; miembros de grupos sensibles pueden experimentar efectos más graves.' },
    { level: 'Muy dañino', range: '201-300', color: '#8f3f97', advice: 'Advertencias de salud de situaciones de emergencia. Toda la población es más probable que se vea afectada.' },
    { level: 'Peligroso', range: '301-500', color: '#7e0023', advice: 'Alerta sanitaria: todos pueden experimentar efectos graves en la salud.' },
  ];

  const getTextColor = (backgroundColor) => {
    return backgroundColor === '#00e400' || backgroundColor === '#ffff00' ? '#000' : '#FFF';
  };

  return (
    <div className="scale-container">
      <div className="scale-content">
        <div className="scale-section">
          <h2 className="scale-title">Escala de Calidad del Aire</h2>
          {scale.map((item, index) => (
            <div
              key={index}
              className="scale-item"
              style={{ backgroundColor: item.color, color: getTextColor(item.color) }}
            >
              <p className="level">{item.level} ({item.range})</p>
              <p className="advice">{item.advice}</p>
            </div>
          ))}
        </div>
        <div className="image-section">
          <h3 className="image-title">Imágenes Informativas</h3>
          <div className="blog-item">
            <img className="blog-image" src="https://www.24cdmx.com/content/images/size/w1200/2023/06/Dise-o-sin-t-tulo--93--1.png" alt="Calidad del Aire en CDMX" />
            <p className="blog-text">La calidad del aire en la Ciudad de México ha mejorado en los últimos años, pero aún es necesario tomar medidas para reducir la contaminación.</p>
          </div>
          <div className="blog-item">
            <img className="blog-image" src="https://valenciaplaza.com/public/Image/2016/8/pap-10-plantas-medicinales-comestibles_NoticiaAmpliada.jpg" alt="Plantas y Calidad del Aire" />
            <p className="blog-text">Cómo las plantas pueden ayudar a mejorar la calidad del aire en interiores y exteriores.</p>
          </div>
          <div className="blog-item">
            <img className="blog-image" src="https://pensemosverde.com/wp-content/uploads/2017/03/imagen-31.jpg" alt="Ejercicio y Contaminación" />
            <p className="blog-text">Consejos para protegerte de la contaminación del aire durante el ejercicio al aire libre.</p>
          </div>
        </div>
      </div>
      <div className="more-info">
        <h3 className="more-info-title">Consejos para Mantenerse Saludable</h3>
        <div className="tips-section">
          <div className="tip-item">
            <img className="tip-icon" src="https://img.icons8.com/color/96/000000/water.png" alt="water" />
            <p className="tip-text">Mantente hidratado y evita actividades al aire libre si la calidad del aire es dañina.</p>
          </div>

          <div className="tip-item">
            <img className="tip-icon" src="https://img.icons8.com/color/96/000000/protection-mask.png" alt="mask" />
            <p className="tip-text">Usa mascarillas N95 para reducir la exposición a contaminantes si la calidad del aire es muy dañina.</p>
          </div>
          <div className="tip-item">
            <img className="tip-icon" src="https://img.icons8.com/color/96/000000/forest.png" alt="trees" />
            <p className="tip-text">Planta árboles y mantén áreas verdes para mejorar la calidad del aire en tu comunidad.</p>
          </div>
          <div className="tip-item">
            <img className="tip-icon" src="https://e7.pngegg.com/pngimages/783/363/png-clipart-bicycle-graphics-mountain-bike-cycling-city-cyclist-logo-bicycle.png" alt="car" />
            <p className="tip-text">Utiliza transporte público, bicicleta o camina para reducir la contaminación vehicular.</p>
          </div>
        </div>
      </div>
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

export default AirQualityScale;
