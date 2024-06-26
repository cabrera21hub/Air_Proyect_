import { View, Text, Alert, ActivityIndicator, FlatList, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import ChartScreen from './ChartScreen';
import AirQualityScale from './AirQualityScale';
import { styles } from './Estilos';

const Clima = () => {
    const [data, setData] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch('http://api.weatherapi.com/v1/forecast.json?key=1fb72a14371346eb839225803230910&q=Mexico City&days=5&aqi=yes&alerts=no&lang=es')
            .then(res => res.json())
            .then(obj => {
                setData(obj);
                setLoad(true);
            })
            .catch(err => Alert.alert('Error inesperado : ' + err));

        fetch('http://api.airvisual.com/v2/city?city=Mexico City&state=Mexico City&country=Mexico&key=12bc6a9b-50e4-4db3-94ed-58d30440af97')
            .then(res => res.json())
            .then(obj => {
                setAirQuality(obj.data.current.pollution);
            })
            .catch(err => Alert.alert('Error al obtener la calidad del aire: ' + err));
    }, []);

    const getAirQualityLevel = (aqi) => {
        if (aqi <= 50) return 'Bueno';
        if (aqi <= 100) return 'Moderado';
        if (aqi <= 150) return 'Dañino para grupos sensibles';
        if (aqi <= 200) return 'Dañino';
        if (aqi <= 300) return 'Muy dañino';
        return 'Peligroso';
    };

    const getAirQualityColor = (aqi) => {
        if (aqi <= 50) return '#00e400';
        if (aqi <= 100) return '#ffff00';
        if (aqi <= 150) return '#ff7e00';
        if (aqi <= 200) return '#ff0000';
        if (aqi <= 300) return '#8f3f97';
        return '#7e0023';
    };

    const Card = ({ fecha, iko, condicion, min, max }) => {
        return (
            <View style={[styles.vContainer, styles.card]}>
                <View style={styles.vContainer}>
                    <Image style={styles.icon} source={{ uri: 'https:' + iko }} />
                    <Text style={styles.datosBold}>{fecha}</Text>
                    <Text style={styles.datosBold}>{condicion}</Text>
                </View>
                <View style={styles.vContainer}>
                    <Text style={styles.datosBold}>{max}°C</Text>
                    <Text style={styles.texto}> / </Text>
                    <Text style={styles.datosBold}>{min}°C</Text>
                </View>
            </View>
        );
    };

    const CardDias = ({ temperatura, ico, vel, hora }) => {
        const date = hora;
        const fechaHora = date.split(" ");
        const hour = fechaHora[1];
        return (
            <View style={styles.hContainer}>
                <Text style={styles.datosBold}>{temperatura}°</Text>
                <Image style={styles.icon} source={{ uri: 'https:' + ico }} />
                <Text style={styles.datos}>{vel} km/h</Text>
                <Text style={styles.texto}>{hour}</Text>
            </View>
        );
    };

    const Datos = ({ dato, valor }) => {
        return (
            <View style={[styles.datoItem, styles.horizontalWrap]}>
                <Text style={styles.texto}>{dato}</Text>
                <Text style={styles.datosBold}>{valor}</Text>
            </View>
        );
    };

    const LScreen = () => {
        const airQualityLevel = airQuality ? getAirQualityLevel(airQuality.aqius) : '';
        const airQualityColor = airQuality ? getAirQualityColor(airQuality.aqius) : '#000';
        const textColor = airQualityColor === '#ffff00' ? '#000' : '#FFF';

        return (
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <View style={styles.datosContainer}>
                    <Text style={styles.lugar}>{data.location.name}</Text>
                    <View style={styles.centered}>
                        <View style={[styles.vContainer, styles.centered]}>
                            <Text style={styles.temperatura}>{data.current.temp_c}</Text>
                            <Text style={styles.degreeSymbol}>°C</Text>
                        </View>

                        <View style={styles.vContainer}>
                            <Text style={styles.datosBold}>{data.current.condition.text}</Text>
                            <Text style={styles.datosBold}>{data.forecast.forecastday[0].day.maxtemp_c}°C</Text>
                            <Text style={styles.texto}> / </Text>
                            <Text style={styles.datosBold}>{data.forecast.forecastday[0].day.mintemp_c}°C</Text>
                        </View>
                    </View>
                </View>

                {/* Mostrar calidad del aire actual */}
                {airQuality && (
                    <View style={[styles.airQualityContainer, { backgroundColor: airQualityColor }]}>
                        <Text style={styles.title}>Calidad del Aire Actual</Text>
                        <Text style={[styles.datosBold, { color: textColor }]}>{`AQI: ${airQuality.aqius} - ${airQualityLevel}`}</Text>
                    </View>
                )}

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 19.432608,
                            longitude: -99.133209,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: 19.432608,
                                longitude: -99.133209,
                            }}
                            title={data.location.name}
                            description={`Temperatura actual: ${data.current.temp_c}°C`}
                        />
                    </MapView>
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Tendencia de Calidad del Aire</Text>
                    <View style={styles.centered}>
                        <ChartScreen />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Pronóstico de 5 días</Text>
                    <FlatList
                        data={data.forecast.forecastday}
                        renderItem={({ item }) => <Card fecha={item.date}
                            iko={item.day.condition.icon}
                            condicion={item.day.condition.text}
                            max={item.day.maxtemp_c}
                            min={item.day.mintemp_c} />}
                        keyExtractor={(item) => item.date}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>Pronóstico de 24 horas</Text>
                    <FlatList
                        data={data.forecast.forecastday[0].hour}
                        renderItem={({ item }) => <CardDias temperatura={item.temp_c}
                            ico={item.condition.icon}
                            vel={item.wind_kph}
                            hora={item.time} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.column}>
                        <Datos dato={'Humedad'} valor={data.current.humidity + '%'} />
                        <Datos dato={'Sensación real'} valor={data.current.feelslike_c + '°'} />
                        <Datos dato={'UV'} valor={data.current.uv} />
                    </View>
                    <View style={styles.column}>
                        <Datos dato={'Presión'} valor={data.current.pressure_mb + ' mbar'} />
                        <Datos dato={'Prob. de lluvia'} valor={data.forecast.forecastday[0].day.daily_chance_of_rain + '%'} />
                        <View style={styles.horizontalWrap}>
                            <Text style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunrise}</Text>
                            <Text style={styles.texto}> Amanecer</Text>
                        </View>
                        <View style={styles.horizontalWrap}>
                            <Text style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunset}</Text>
                            <Text style={styles.texto}> Anochecer</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    };

    const Uscreen = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color={'darkblue'} />
                <Text>Cargando datos...</Text>
            </View>
        );
    };

    return (
        <View style={styles.root}>
            {load ? LScreen() : Uscreen()}
        </View>
    );
};

export default Clima;
