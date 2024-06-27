import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './components/Home';
import AirQualityScale from './components/AirQualityScale';
import AboutUs from './components/AboutUs';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <NavLink className="nav-link" to="/" exact activeClassName="nav-link-active">Home</NavLink>
          <NavLink className="nav-link" to="/air-quality-scale" activeClassName="nav-link-active">Escala</NavLink>
          <NavLink className="nav-link" to="/about-us" activeClassName="nav-link-active">Acerca de Nosotros</NavLink>
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
