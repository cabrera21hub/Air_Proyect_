import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AirQualityScale from './components/AirQualityScale';
import AboutUs from './components/AboutUs';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/air-quality-scale">Escala</Link>
          <Link className="nav-link" to="/about-us">Acerca de Nosotros</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/air-quality-scale" element={<AirQualityScale />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
