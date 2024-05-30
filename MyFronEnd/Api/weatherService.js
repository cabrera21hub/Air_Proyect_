// weatherService.js
import axios from 'axios';
import { WEATHER_API_URL, WEATHER_API_KEY, CITY_ID } from '../config';  // Ajusta la ruta según la ubicación de config.js

export const getWeatherData = async () => {
  try {
    const response = await axios.get(`${WEATHER_API_URL}?id=${CITY_ID}&appid=${WEATHER_API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
