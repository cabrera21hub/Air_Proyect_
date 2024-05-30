import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getWeatherData } from '../Api/weatherService';

const CombinedScreen = () => {
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

  const region = {
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const marker = {
    coordinate: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
    title: "CDMX",
    description: "Ciudad de México",
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      </MapView>
      {weatherData && (
        <View style={styles.weather}>
          <Text style={styles.text}>Temperature: {weatherData.main.temp}°C</Text>
          <Text style={styles.text}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.text}>Wind Speed: {weatherData.wind.speed} m/s</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
    marginBottom: 20,
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

export default CombinedScreen;
