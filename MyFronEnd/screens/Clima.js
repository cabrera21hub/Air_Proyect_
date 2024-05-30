import { View, Text, Alert, ActivityIndicator, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import ChartScreen from './ChartScreen';
import AirQualityScale from './AirQualityScale';
import { styles } from './Estilos';

const Clima = () => {
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch('http://api.weatherapi.com/v1/forecast.json?key=1fb72a14371346eb839225803230910&q=huejutla&days=5&aqi=yes&alerts=no&lang=es')
            .then(res => res.json())
            .then(obj => {
                setData(obj);
                setLoad(true);
            })
            .catch(err => Alert.alert('Error inesperado : ' + err));
    }, []);

    const Card = ({ fecha, iko, condicion, min, max }) => {
        return (
            <View style={[styles.vContainer, { justifyContent: 'space-between' }]}>
                <View style={styles.vContainer}>
                    <Image style={{ height: 50, width: 50 }}
                        source={{ uri: 'https:' + iko }} />
                    <Text style={styles.datosBold}>{fecha} </Text>
                    <Text style={styles.datosBold}> {condicion} </Text>
                </View>
                <View style={styles.vContainer}>
                    <Text style={styles.datosBold}> {max}°C </Text>
                    <Text style={styles.texto}>/</Text>
                    <Text style={styles.datosBold}> {min}°C </Text>
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
                <Image style={{ height: 50, width: 50 }}
                    source={{ uri: 'https:' + ico }} />
                <Text style={styles.datos}>{vel} km/h</Text>
                <Text style={styles.texto}>{hour}</Text>
            </View>
        );
    };

    const Datos = ({ dato, valor }) => {
        return (
            <View style={[styles.vContainer, { justifyContent: 'space-between', borderBottomColor: '#AFCAF3', borderBottomWidth: 0.2, paddingBottom: 3 }]}>
                <Text style={styles.texto}>{dato}</Text>
                <Text style={styles.datosBold}>{valor}</Text>
            </View>
        );
    };

    const LScreen = () => {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.datosContainer}>
                    <Text style={styles.lugar}>{data.location.name}</Text>
                    <View>
                        <View style={[styles.vContainer, { alignItems: 'flex-start', marginBottom: -22 }]}>
                            <Text style={styles.temperatura}>{data.current.temp_c}</Text>
                            <Text style={[styles.lugar, { marginTop: 18 }]}>°C</Text>
                        </View>

                        <View style={styles.vContainer}>
                            <Text style={styles.datosBold}>{data.current.condition.text} </Text>
                            <Text style={styles.datosBold}> {data.forecast.forecastday[0].day.maxtemp_c} °C  </Text>
                            <Text style={styles.texto}>/</Text>
                            <Text style={styles.datosBold}> {data.forecast.forecastday[0].day.mintemp_c} °C  </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: data.location.lat,
                            longitude: data.location.lon,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: data.location.lat,
                                longitude: data.location.lon,
                            }}
                            title={data.location.name}
                            description={`Temperatura actual: ${data.current.temp_c}°C`}
                        />
                    </MapView>
                </View>

                {/* Aquí agregamos el ChartScreen */}
                <View style={styles.container}>
                    <Text style={styles.title}>Tendencia de Calidad del Aire</Text>
                    <View style={{ alignItems: 'center' }}>
                        <ChartScreen />
                    </View>
                </View>

                {/* Aquí agregamos el AirQualityScale */}
                <AirQualityScale />

                <View style={styles.container}>
                    <Text style={styles.title}>Pronóstico de 5 días</Text>
                    <FlatList
                        data={data.forecast.forecastday}
                        renderItem={({ item }) => <Card fecha={item.date}
                            iko={item.day.condition.icon}
                            condicion={item.day.condition.text}
                            max={item.day.maxtemp_c}
                            min={item.day.mintemp_c} horizontal />} />
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
                        showsHorizontalScrollIndicator={false} />
                </View>

                <View style={styles.vContainer}>
                    <View>
                        <View style={styles.container}>
                            <Text style={styles.datosBold}>{data.current.wind_dir}</Text>
                            <Text style={styles.datosBold}>{data.current.wind_kph} km/h</Text>
                        </View>
                        <View style={styles.container}>
                            <View style={styles.vContainer}>
                                <Text style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunrise}</Text>
                                <Text style={styles.texto}>  Amanecer</Text>
                            </View>
                            <View style={styles.vContainer}>
                                <Text style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunset}</Text>
                                <Text style={styles.texto}>  Anochecer</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.container, { marginLeft: -5 }]}>
                        <Datos dato={'Humedad'} valor={data.current.humidity + '%'} />
                        <Datos dato={'Sensación real      '} valor={data.current.feelslike_c + '°'} />
                        <Datos dato={'UV'} valor={data.current.uv} />
                        <Datos dato={'Presión'} valor={data.current.pressure_mb + 'mbar'} />
                        <Datos dato={'Prob. de lluvia'} valor={data.forecast.forecastday[0].day.daily_chance_of_rain + '%'} />
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
