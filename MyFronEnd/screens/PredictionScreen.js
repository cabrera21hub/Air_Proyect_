import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { getWeatherData } from '../Api/weatherService'; // Asegúrate de tener esta función

const PredictionScreen = () => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const predictAirQuality = async (data) => {
      // Carga un modelo previamente entrenado (esto es un ejemplo, necesitas un modelo real)
      const model = await tf.loadLayersModel('https://path-to-your-model/model.json');

      // Realiza predicciones
      const inputData = tf.tensor2d([data]);
      const prediction = model.predict(inputData);
      prediction.print();
      setPrediction(prediction.dataSync()[0]);
    };

    const fetchData = async () => {
      const weatherData = await getWeatherData();
      const data = [
        weatherData.main.temp,
        weatherData.main.humidity,
        weatherData.wind.speed,
      ];
      predictAirQuality(data);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {prediction ? (
        <Text style={styles.text}>Predicción de Calidad del Aire: {prediction}</Text>
      ) : (
        <Text style={styles.text}>Cargando predicción...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default PredictionScreen;
