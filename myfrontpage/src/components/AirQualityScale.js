import React from 'react';
import '..//components/styles/AirQualityScale.css';

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

  const handlePress = (advice) => {
    alert(advice);
  };

  return (
    <div className="scale-container">
      <h2 className="scale-title">Escala de Calidad del Aire</h2>
      {scale.map((item, index) => (
        <div
          key={index}
          className="scale-item"
          style={{ backgroundColor: item.color, color: getTextColor(item.color) }}
          onClick={() => handlePress(item.advice)}
        >
          <p className="level">{item.level} ({item.range})</p>
          <p className="advice">{item.advice}</p>
        </div>
      ))}
      <div className="tips-container">
        <h3 className="tips-title">Consejos para Mantenerse Saludable</h3>
        <div className="tip-item" style={{ backgroundColor: '#4682B4' }}>
          <img className="tip-icon" src="https://img.icons8.com/ios-filled/50/000000/water.png" alt="water" />
          <p className="tip-text">Mantente hidratado y evita actividades al aire libre si la calidad del aire es dañina.</p>
        </div>
        <div className="tip-item" style={{ backgroundColor: '#4682B4' }}>
          <img className="tip-icon" src="https://img.icons8.com/?size=100&id=66991&format=png&color=000000" alt="air purifier" />
          <p className="tip-text">Utiliza purificadores de aire en interiores para mantener un ambiente saludable.</p>
        </div>
        <div className="tip-item" style={{ backgroundColor: '#4682B4' }}>
          <img className="tip-icon" src="https://img.icons8.com/?size=100&id=NkranikRRFwz&format=png&color=000000" alt="mask" />
          <p className="tip-text">Usa mascarillas N95 para reducir la exposición a contaminantes si la calidad del aire es muy dañina.</p>
        </div>
      </div>
    </div>
  );
};

export default AirQualityScale;
