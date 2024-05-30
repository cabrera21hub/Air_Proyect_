import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getWeatherData } from '../Api/weatherService';

const WeatherScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {weatherData && (
        <View style={styles.weather}>
          <Text style={styles.text}>Temperature: {weatherData.main.temp}°C</Text>
          <Text style={styles.text}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.text}>Wind Speed: {weatherData.wind.speed} m/s</Text>
        </View>
      )}
      <Button
        title="Volver a Inicio"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  weather: {
    padding: 15,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
  },
});

export default WeatherScreen;
