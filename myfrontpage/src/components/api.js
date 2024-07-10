import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/calidad_aire/';

export const getAirQualityData = async (date) => {
  try {
    const response = await axios.get(`${API_URL}${date}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
};
