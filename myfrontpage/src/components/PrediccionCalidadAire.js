import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CustomAirQualityChart from './CustomAirQualityChart';
import '../components/styles/PrediccionCalidadAire.css';

const PrediccionCalidadAire = () => {
  const location = useLocation();
  const [prediccionData, setPrediccionData] = useState([]);
  const query = new URLSearchParams(location.search);
  const date = query.get('date');

  useEffect(() => {
    const fetchPrediccionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/prediccion_calidad_aire/${date}`);
        setPrediccionData(response.data);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
      }
    };

    fetchPrediccionData();
  }, [date]);

  return (
    <div className="prediccion-container">
      <h2>Predicción de Calidad del Aire para los próximos 5 días</h2>
      <div className="prediccion-content">
        {prediccionData.map((dayData, index) => (
          <div key={index} className="day-prediction">
            <h3>{dayData.date}</h3>
            <CustomAirQualityChart data={[dayData]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrediccionCalidadAire;
