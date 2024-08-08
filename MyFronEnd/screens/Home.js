import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';
import Grafica_Air from './Grafica_Air';
import { WEATHER_API_URL, WEATHER_API_KEY, CITY_ID, API_URL } from '../config';
import Pronostico from './Pronostico';
import Modal from 'react-native-modal';
import { addDays, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState(null);
  const [currentAirQuality, setCurrentAirQuality] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${WEATHER_API_URL}?id=${CITY_ID}&appid=${WEATHER_API_KEY}&units=metric`, { timeout: 10000 });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      console.log('Selected date:', formattedDate);

      try {
        const response = await axios.get(`http://192.168.1.75:8000/api/calidad_aire/${formattedDate}/`, { timeout: 10000 });
        console.log('API response:', response.data);
        setAirQualityData(response.data);
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchAirQualityData();
  }, [selectedDate]);

  useEffect(() => {
    const fetchCurrentAirQuality = async () => {
      try {
        const response = await axios.get(API_URL, { timeout: 10000 });
        setCurrentAirQuality(response.data.data.current.pollution);
      } catch (error) {
        console.error('Error fetching current air quality data:', error);
      }
    };

    fetchCurrentAirQuality();
  }, []);

  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return '#00e400';
    if (aqi <= 100) return '#ffff00';
    if (aqi <= 150) return '#ff7e00';
    if (aqi <= 200) return '#ff0000';
    if (aqi <= 300) return '#8f3f97';
    return '#7e0023';
  };

  const handleYearClick = async (year) => {
    try {
      const response = await axios.get(`http://192.168.1.75:8000/api/historical_data/${year}/`, { timeout: 10000 });
      let data = response.data;

      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      const filteredData = data.filter(item => !isNaN(item['Predicción_PM2.5']));
      setHistoricalData(filteredData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setHistoricalData([]);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);//este es el nuevo
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>CIUDAD DE MEXICO</Text>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>¿CALIDAD DEL AIRE?</Text>
        <Text> La calidad del aire mide qué tan limpio o contaminado está el aire que respiramos. Factores como el humo de los vehículos, las fábricas y el polvo pueden afectar nuestra salud.</Text>
      </View>

      {weatherData && (
        <View style={{ marginBottom: 20 }}>
          <Text>TEMPERATURA: {weatherData.main.temp.toFixed(2)}°C</Text>
          <Text>HUMEDAD: {weatherData.main.humidity} %</Text>
        </View>
      )}

      {currentAirQuality && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ backgroundColor: getAirQualityColor(currentAirQuality.aqius), padding: 10, color: '#fff' }}>
            CALIDAD DEL AIRE: AQI - {currentAirQuality.aqius}
          </Text>
        </View>
      )}

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>SELECCIONE EL DÍA QUE DESEE OBSERVAR EL PRONÓSTICO</Text>
        <CalendarPicker onDateChange={(date) => setSelectedDate(new Date(date))} />
      </View>

      {chartData && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>GRAFICA DE LA CALIDAD DEL AIRE ESTA SEMANA</Text>
          <Grafica_Air data={chartData} />
        </View>
      )}

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>SELECCIONE EL AÑO</Text>
        <Button title="2021" onPress={() => handleYearClick(2021)} />
        <Button title="2022" onPress={() => handleYearClick(2022)} />
        <Button title="2023" onPress={() => handleYearClick(2023)} />
        <Button title="2024" onPress={() => handleYearClick(2024)} />
      </View>

      {historicalData.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Datos Históricos del Año</Text>
          <Grafica_Air data={historicalData} />
        </View>
      )}

      <Button title="Ver Pronóstico" onPress={openModal} />

      <Modal isVisible={modalIsOpen} onBackdropPress={closeModal}>
        <Pronostico airQualityData={airQualityData} onBack={closeModal} />
      </Modal>
    </ScrollView>
  );
};

export default Home;