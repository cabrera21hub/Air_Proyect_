import React from 'react';
import './styles/AirQualityScale.css';

const AirQualityScale = () => {
  return (
    <div className="scale-container">
      <h2>Escala de Calidad del Aire</h2>
      <div className="scale">
        <div className="scale-level" style={{ backgroundColor: '#00e400' }}>
          <p>Buena</p>
          <p>0-50</p>
        </div>
        <div className="scale-level" style={{ backgroundColor: '#ffff00' }}>
          <p>Moderada</p>
          <p>51-100</p>
        </div>
        <div className="scale-level" style={{ backgroundColor: '#ff7e00' }}>
          <p>Insalubre para grupos sensibles</p>
          <p>101-150</p>
        </div>
        <div className="scale-level" style={{ backgroundColor: '#ff0000' }}>
          <p>Insalubre</p>
          <p>151-200</p>
        </div>
        <div className="scale-level" style={{ backgroundColor: '#8f3f97' }}>
          <p>Muy insalubre</p>
          <p>201-300</p>
        </div>
        <div className="scale-level" style={{ backgroundColor: '#7e0023' }}>
          <p>Peligroso</p>
          <p>301-500</p>
        </div>
      </div>
    </div>
  );
};

export default AirQualityScale;
