import React from 'react';
import './styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Acerca de Nosotros</h1>
      <img 
        src="https://www.uthh.edu.mx/imagenes/galeria_imagenes/Logotipos_Institucionales/2021091804500411_gal.png" 
        alt="UTHH Logo" 
        className="about-image" 
      />
      <p className="about-text">
        La Universidad Tecnológica de la Huasteca Hidalguense (UTHH) es una alternativa de estudios para egresados de escuelas con nivel media superior; al formar Técnicos Superiores Universitarios (TSU) y así mismo un nivel de estudios de licenciatura e ingeniería.
      </p>
      <div className="about-contact">
        <h2 className="about-subtitle">Comunícate con Nosotros</h2>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/instagram-icon.png" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/facebook-icon.png" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img src="/assets/whatsapp-icon.png" alt="WhatsApp" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
