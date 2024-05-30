import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AirQualityScale = () => {
    const scale = [
        { level: 'Bueno', range: '0-50', color: '#00e400', advice: 'La calidad del aire es satisfactoria y no presenta ningún riesgo para la salud.' },
        { level: 'Moderado', range: '51-100', color: '#ffff00', advice: 'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede haber un problema de salud moderado para un número muy reducido de personas que son especialmente sensibles a la contaminación del aire.' },
        { level: 'Dañino para grupos sensibles', range: '101-150', color: '#ff7e00', advice: 'Miembros de grupos sensibles pueden experimentar efectos en su salud. El público en general no es probable que se vea afectado.' },
        { level: 'Dañino', range: '151-200', color: '#ff0000', advice: 'Todos pueden comenzar a experimentar efectos en la salud; miembros de grupos sensibles pueden experimentar efectos más graves.' },
        { level: 'Muy dañino', range: '201-300', color: '#8f3f97', advice: 'Advertencias de salud de situaciones de emergencia. Toda la población es más probable que se vea afectada.' },
        { level: 'Peligroso', range: '301-500', color: '#7e0023', advice: 'Alerta sanitaria: todos pueden experimentar efectos graves en la salud.' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Escala de Calidad del Aire</Text>
            {scale.map((item, index) => (
                <View key={index} style={[styles.scaleItem, { backgroundColor: item.color }]}>
                    <Text style={styles.level}>{item.level} ({item.range})</Text>
                    <Text style={styles.advice}>{item.advice}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#001f3f',
    },
    title: {
        color: '#AFCAF3',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    scaleItem: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    level: {
        color: 'white',
        fontWeight: 'bold',
    },
    advice: {
        color: 'white',
    },
});

export default AirQualityScale;
