import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AirQualityScale from './components/AirQualityScale';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import AboutUs from './components/AboutUs';
import './App.css';
import logo from './components/imagenes/1.png'; // Importa la imagen correctamente

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advice" element={<AirQualityScale />} />
          <Route path="/faq" element={<PreguntasFrecuentes />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
};

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="logo-text">
          <span>CLIMATE</span>
          <span>QUALITY</span>
        </div>
      </div>
      <nav className="nav">
        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">INICIO</Link>
        <Link className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`} to="/faq">PREGUNTAS FRECUENTES</Link>
        <Link className={`nav-link ${location.pathname === '/about-us' ? 'active' : ''}`} to="/about-us">ACERCA DE NOSOTROS</Link>
      </nav>
    </header>
  );
};

export default App;
