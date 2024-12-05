import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ChartScreen from './ChartScreen';

const DatosScreen = () => {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        fetch('http://api.weatherapi.com/v1/forecast.json?key=1fb72a14371346eb839225803230910&q=Mexico City&days=7&aqi=yes&alerts=no&lang=es')
            .then(response => response.json())
            .then(data => setForecastData(data.forecast.forecastday))
            .catch(error => console.error(error));
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.chartContainer}>
                <Text style={styles.title}>Tendencia de Calidad del Aire de la Semana</Text>
                <View style={styles.chart}>
                    <ChartScreen />
                </View>
                <Text style={styles.description}>
                    Este gráfico muestra la tendencia de la calidad del aire para los próximos 7 días en la Ciudad de México. La calidad del aire se mide usando el Índice de Calidad del Aire (AQI).
                </Text>
            </View>

            <View style={styles.predictionContainer}>
                <Text style={styles.title}>Predicción para Mañana</Text>
                <View style={styles.prediction}>
                    <Text style={styles.aqi}>80 AQI</Text>
                    <Text style={styles.aqiDescription}>Calidad del Aire</Text>
                </View>
            </View>

            <View style={styles.forecastContainer}>
                <Text style={styles.title}>Pronóstico de 5 Días</Text>
                {forecastData.map(day => (
                    <View key={day.date} style={styles.forecastDay}>
                        <Text style={styles.date}>{day.date}</Text>
                        <Text style={styles.condition}>{day.day.condition.text}</Text>
                        <Text style={styles.temp}>{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        padding: 15,
        paddingTop: 30, // Añade padding desde la parte superior
    },
    chartContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#002366',
        textAlign: 'center',
    },
    chart: {
        width: '100%',
        height: 200,
        justifyContent: 'center', // Center chart vertically
        alignItems: 'center', // Center chart horizontally
        marginBottom: 20, // Increase margin bottom for better spacing
    },
    description: {
        fontSize: 14,
        color: '#002366',
        marginTop: 10,
        textAlign: 'center',
    },
    predictionContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
    },
    prediction: {
        backgroundColor: '#4682B4',
        borderRadius: 10,
        padding: 20, // Increase padding for better spacing
        alignItems: 'center',
        width: '100%',
    },
    aqi: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF',
    },
    aqiDescription: {
        fontSize: 16,
        color: '#FFF',
    },
    forecastContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    forecastDay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    date: {
        fontSize: 14,
        color: '#002366',
    },
    condition: {
        fontSize: 14,
        color: '#002366',
    },
    temp: {
        fontSize: 14,
        color: '#002366',
    },
});

export default DatosScreen;
