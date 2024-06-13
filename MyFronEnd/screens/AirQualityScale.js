import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';

const AirQualityScale = () => {
    const scale = [
        { level: 'Bueno', range: '0-50', color: '#00e400', advice: 'La calidad del aire es satisfactoria y no presenta ningún riesgo para la salud.' },
        { level: 'Moderado', range: '51-100', color: '#ffff00', advice: 'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede haber un problema de salud moderado para un número muy reducido de personas que son especialmente sensibles a la contaminación del aire.' },
        { level: 'Dañino para grupos sensibles', range: '101-150', color: '#ff7e00', advice: 'Miembros de grupos sensibles pueden experimentar efectos en su salud. El público en general no es probable que se vea afectado.' },
        { level: 'Dañino', range: '151-200', color: '#ff0000', advice: 'Todos pueden comenzar a experimentar efectos en la salud; miembros de grupos sensibles pueden experimentar efectos más graves.' },
        { level: 'Muy dañino', range: '201-300', color: '#8f3f97', advice: 'Advertencias de salud de situaciones de emergencia. Toda la población es más probable que se vea afectada.' },
        { level: 'Peligroso', range: '301-500', color: '#7e0023', advice: 'Alerta sanitaria: todos pueden experimentar efectos graves en la salud.' },
    ];

    const getTextColor = (backgroundColor) => {
        return backgroundColor === '#00e400' || backgroundColor === '#ffff00' ? '#000' : '#FFF';
    };

    const handlePress = (advice) => {
        Alert.alert("Consejo de Salud", advice);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Escala de Calidad del Aire</Text>
                {scale.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.scaleItem, { backgroundColor: item.color }]}
                        onPress={() => handlePress(item.advice)}
                    >
                        <Text style={[styles.level, { color: getTextColor(item.color) }]}>{item.level} ({item.range})</Text>
                        <Text style={[styles.advice, { color: getTextColor(item.color) }]}>{item.advice}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Consejos para Mantenerse Saludable</Text>
                <View style={[styles.adviceContainer, { backgroundColor: '#4682B4' }]}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/water.png' }} />
                    <Text style={styles.extraAdvice}>Mantente hidratado y evita actividades al aire libre si la calidad del aire es dañina.</Text>
                </View>
                <View style={[styles.adviceContainer, { backgroundColor: '#4682B4' }]}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/?size=100&id=66991&format=png&color=000000' }} />
                    <Text style={styles.extraAdvice}>Utiliza purificadores de aire en interiores para mantener un ambiente saludable.</Text>
                </View>
                <View style={[styles.adviceContainer, { backgroundColor: '#4682B4' }]}>
                    <Image style={styles.icon} source={{ uri: 'https://img.icons8.com/?size=100&id=NkranikRRFwz&format=png&color=000000' }} />
                    <Text style={styles.extraAdvice}>Usa mascarillas N95 para reducir la exposición a contaminantes si la calidad del aire es muy dañina.</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87CEEB', // Azul cielo más claro
        paddingTop: 40, // Añadir padding superior
        paddingBottom: 20, // Añadir padding inferior
    },
    container: {
        width: '90%',
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#FFFFFF', // Fondo blanco para el contenido
        marginBottom: 20,
    },
    title: {
        color: '#002366',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    scaleItem: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    level: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    advice: {
        fontSize: 14,
    },
    adviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    extraAdvice: {
        fontSize: 14,
        color: '#FFF',
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default AirQualityScale;
