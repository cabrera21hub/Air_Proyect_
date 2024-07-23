import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import Grafica_Air from './Grafica_Air';

const Pronostico = ({ airQualityData, onBack }) => {
  const getAirQualityInfo = (aqi) => {
    if (aqi <= 50) return { level: 'Bueno', advice: 'La calidad del aire es satisfactoria y no presenta ningún riesgo para la salud.' };
    if (aqi <= 100) return { level: 'Moderado', advice: 'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede haber un problema de salud moderado para un número muy reducido de personas que son especialmente sensibles a la contaminación del aire.' };
    if (aqi <= 150) return { level: 'Dañino para grupos sensibles', advice: 'Miembros de grupos sensibles pueden experimentar efectos en su salud. El público en general no es probable que se vea afectado.' };
    if (aqi <= 200) return { level: 'Dañino', advice: 'Todos pueden comenzar a experimentar efectos en la salud; miembros de grupos sensibles pueden experimentar efectos más graves.' };
    if (aqi <= 300) return { level: 'Muy dañino', advice: 'Advertencias de salud de situaciones de emergencia. Toda la población es más probable que se vea afectada.' };
    return { level: 'Peligroso', advice: 'Alerta sanitaria: todos pueden experimentar efectos graves en la salud.' };
  };

  if (!Array.isArray(airQualityData) || airQualityData.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay datos de pronóstico disponibles.</Text>
        <Button title="Regresar" onPress={onBack} />
      </View>
    );
  }

  const airQualityInfo = getAirQualityInfo(airQualityData[0]['Predicción_PM2.5']);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PRONOSTICO DEL DIA</Text>
      <View style={styles.chartContainer}>
        <Grafica_Air data={airQualityData} />
      </View>
      <View style={styles.infoCard}>
        <View style={styles.aqiContainer}>
          <Text>{airQualityData[0]['Predicción_PM2.5']} AQI</Text>
          <Text>{airQualityInfo.level}</Text>
        </View>
        <View style={styles.advice}>
          <Text style={styles.adviceTitle}>Consejos:</Text>
          <Text>{airQualityInfo.advice}</Text>
          <Text>Evite salir si no es necesario.</Text>
          <Text>Use mascarilla al aire libre.</Text>
          <Text>Evite realizar ejercicios al aire libre.</Text>
        </View>
      </View>
      <Button title="Regresar" onPress={onBack} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
  },
  infoCard: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  aqiContainer: {
    marginBottom: 10,
  },
  advice: {
    marginTop: 10,
  },
  adviceTitle: {
    fontWeight: 'bold',
  },
});

export default Pronostico;
