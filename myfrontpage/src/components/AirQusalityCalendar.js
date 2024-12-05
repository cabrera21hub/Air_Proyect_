import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { API_URL } from '../config';

const AirQualityCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [airQualityData, setAirQualityData] = useState(null);

    useEffect(() => {
        const fetchAirQualityData = async (selectedDate) => {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            try {
                const response = await fetch(`${API_URL}/calidad_aire/filter_by_date/?fecha=${formattedDate}`);
                const data = await response.json();
                if (data.length > 0) {
                    setAirQualityData(data[0]);
                } else {
                    setAirQualityData(null);
                }
            } catch (error) {
                console.error('Error fetching air quality data:', error);
            }
        };

        fetchAirQualityData(date);
    }, [date]);

    return (
        <div>
            <Calendar onChange={setDate} value={date} />
            {airQualityData && (
                <div>
                    <h2>Calidad del Aire para {date.toDateString()}</h2>
                    <p>Real PM2.5: {airQualityData.real_pm25}</p>
                    <p>Predicted PM2.5: {airQualityData.predicted_pm25}</p>
                </div>
            )}
        </div>
    );
};

export default AirQualityCalendar;
