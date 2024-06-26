import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutUsScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Acerca de Nosotros</Text>
                <Image 
                    source={{ uri: 'https://www.uthh.edu.mx/imagenes/galeria_imagenes/Logotipos_Institucionales/2021091804500411_gal.png' }} 
                    style={styles.image} 
                    resizeMode="contain"
                />
                <Text style={styles.text}>
                    La Universidad Tecnológica de la Huasteca Hidalguense (UTHH) es una alternativa de estudios para egresados de escuelas con nivel media superior; al formar Técnicos Superiores Universitarios (TSU) y así mismo un nivel de estudios de licenciatura e ingeniería.
                </Text>
                <Text style={styles.text}>
                    La UTHH inició sus actividades administrativas en noviembre de 1996 y en enero de 1997 comenzó el periodo de enseñanza con una matrícula de 62 y 40 alumnos en las carreras de Técnico Superior Universitario en Mecánica e Informática respectivamente. La UTHH fue consolidada el 24 de abril del año de 1997 al ser decretado en el Diario Oficial del Estado de Hidalgo, como la Universidad Tecnológica de la Huasteca Hidalguense, Organismo Público Descentralizado del Gobierno del Estado de Hidalgo, siendo Gobernador el Lic. Jesús Murillo Karam.
                </Text>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nuestro Proyecto</Text>
                    <Text style={styles.text}>
                        El proyecto del sistema de predicciones de la calidad del aire surge de la necesidad creciente de mejorar la calidad de vida de los ciudadanos mediante información precisa y oportuna sobre la calidad del aire. Actualmente, la falta de información detallada y accesible sobre la calidad del aire y su predicción representa un desafío significativo para la salud pública y la planificación urbana.
                    </Text>
                    <Text style={styles.text}>
                        Este sistema permitirá una gestión eficiente de los datos de calidad del aire, proporcionando predicciones personalizadas y accesibles para toda la ciudadanía, ayudando a mitigar los efectos adversos de la contaminación del aire.
                    </Text>
                </View>
                <View style={styles.socialSection}>
                    <Text style={styles.subtitle}>Comunícate con Nosotros</Text>
                    <View style={styles.socialContainer}>
                        <View style={styles.socialIconContainer}>
                            <Image 
                                source={{ uri: 'https://img.icons8.com/?size=100&id=ZRiAFreol5mE&format=png&color=000000' }} 
                                style={styles.socialIcon} 
                                resizeMode="contain"
                            />
                            <Text style={styles.socialText}>Instagram</Text>
                        </View>
                        <View style={styles.socialIconContainer}>
                            <Image 
                                source={{ uri: 'https://img.icons8.com/?size=100&id=118497&format=png&color=000000' }} 
                                style={styles.socialIcon} 
                                resizeMode="contain"
                            />
                            <Text style={styles.socialText}>Facebook</Text>
                        </View>
                        <View style={styles.socialIconContainer}>
                            <Image 
                                source={{ uri: 'https://img.icons8.com/?size=100&id=QkXeKixybttw&format=png&color=000000' }} 
                                style={styles.socialIcon} 
                                resizeMode="contain"
                            />
                            <Text style={styles.socialText}>WhatsApp</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#87CEEB', // Azul cielo más claro
        paddingTop: 40, // Añadir padding superior
        paddingHorizontal: 20, // Añadir padding horizontal
        paddingBottom: 20, // Añadir padding inferior
    },
    container: {
        backgroundColor: '#FFFFFF', // Fondo blanco para el contenido
        borderRadius: 10,
        padding: 15,
    },
    title: {
        color: '#002366',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        color: '#002366',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15,
        marginBottom: 5,
        textAlign: 'center',
    },
    text: {
        color: '#002366',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    section: {
        backgroundColor: '#4682B4',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    socialSection: {
        marginTop: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    socialIconContainer: {
        alignItems: 'center',
    },
    socialIcon: {
        width: 50,
        height: 50,
    },
    socialText: {
        color: '#002366',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default AboutUsScreen;
