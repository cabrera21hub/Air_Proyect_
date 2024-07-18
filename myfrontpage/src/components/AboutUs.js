import React from 'react';
import './styles/AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">Acerca de Nosotros</h1>
        <img 
          src="https://www.uthh.edu.mx/imagenes/galeria_imagenes/Logotipos_Institucionales/2021091804500411_gal.png" 
          alt="UTHH Logo" 
          className="about-image" 
        />
      </div>
      <p className="about-text">
        La Universidad Tecnológica de la Huasteca Hidalguense (UTHH) es una alternativa de estudios para egresados de escuelas con nivel media superior; al formar Técnicos Superiores Universitarios (TSU) y así mismo un nivel de estudios de licenciatura e ingeniería.
      </p>
      <p className="about-text">
        Nuestro propósito principal es la mejora continua en la educación y el desarrollo de nuestros estudiantes. Nos preocupamos profundamente por la calidad del aire y su impacto en la salud de la comunidad. Por eso, nos dedicamos a proporcionar información precisa y útil sobre la calidad del aire y cómo afecta a nuestra salud y bienestar.
      </p>
      <div className="about-contact">
        <h2 className="about-subtitle">Comunícate con Nosotros</h2>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
