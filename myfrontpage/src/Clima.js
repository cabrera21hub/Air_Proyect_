import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import 'leaflet/dist/leaflet.css';

const Clima = () => {
    const [data, setData] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetch('http://api.weatherapi.com/v1/forecast.json?key=1fb72a14371346eb839225803230910&q=huejutla&days=5&aqi=yes&alerts=no&lang=es')
            .then(res => res.json())
            .then(obj => {
                setData(obj);
                setLoad(true);
            })
            .catch(err => {
                setLoad(true);
                setAirQuality(null);
                console.error('Error inesperado: ', err);
                return <Alert variant="danger">Error inesperado: {err.message}</Alert>;
            });

        fetch('http://api.airvisual.com/v2/nearest_city?key=12bc6a9b-50e4-4db3-94ed-58d30440af97')
            .then(res => res.json())
            .then(obj => {
                setAirQuality(obj.data.current.pollution);
            })
            .catch(err => {
                setAirQuality(null);
                console.error('Error al obtener la calidad del aire: ', err);
                return <Alert variant="danger">Error al obtener la calidad del aire: {err.message}</Alert>;
            });
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

    const Card = ({ fecha, iko, condicion, min, max }) => (
        <div style={styles.card}>
            <div style={styles.cardBody}>
                <img src={`https:${iko}`} alt="icono" style={{ height: 50, width: 50 }} />
                <p>{fecha}</p>
                <p>{condicion}</p>
                <p>{max}°C / {min}°C</p>
            </div>
        </div>
    );

    const CardDias = ({ temperatura, ico, vel, hora }) => {
        const date = hora;
        const [fecha, hour] = date.split(" ");
        return (
            <div style={styles.card}>
                <p>{temperatura}°C</p>
                <img src={`https:${ico}`} alt="icono" style={{ height: 50, width: 50 }} />
                <p>{vel} km/h</p>
                <p>{hour}</p>
            </div>
        );
    };

    const Datos = ({ dato, valor }) => (
        <div style={styles.datos}>
            <span>{dato}</span>
            <span>{valor}</span>
        </div>
    );

    const LScreen = () => {
        const airQualityLevel = airQuality ? getAirQualityLevel(airQuality.aqius) : '';
        const airQualityColor = airQuality ? getAirQualityColor(airQuality.aqius) : '#000';
        const textColor = airQualityColor === '#ffff00' ? '#000' : '#FFF';

        return (
            <div style={styles.scrollContainer}>
                <div style={styles.datosContainer}>
                    <h2 style={styles.lugar}>{data.location.name}</h2>
                    <div>
                        <div style={{ ...styles.vContainer, alignItems: 'center', marginBottom: -22 }}>
                            <h1 style={styles.temperatura}>{data.current.temp_c}</h1>
                            <h2 style={{ ...styles.lugar, marginTop: 18 }}>°C</h2>
                        </div>

                        <div style={{ ...styles.vContainer, justifyContent: 'center' }}>
                            <p style={styles.datosBold}>{data.current.condition.text}</p>
                            <p style={styles.datosBold}>{data.forecast.forecastday[0].day.maxtemp_c} °C</p>
                            <p style={styles.texto}>/</p>
                            <p style={styles.datosBold}>{data.forecast.forecastday[0].day.mintemp_c} °C</p>
                        </div>
                    </div>
                </div>

                {airQuality && (
                    <div style={{ ...styles.container, backgroundColor: airQualityColor }}>
                        <h2 style={styles.title}>Calidad del Aire Actual</h2>
                        <p style={{ ...styles.datosBold, color: textColor }}>{`AQI: ${airQuality.aqius} - ${airQualityLevel}`}</p>
                    </div>
                )}

                <div style={styles.mapContainer}>
                    <MapContainer
                        style={styles.map}
                        center={[data.location.lat, data.location.lon]}
                        zoom={13}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[data.location.lat, data.location.lon]}>
                            <Popup>
                                {data.location.name} <br /> Temperatura actual: {data.current.temp_c}°C
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>

                <div style={styles.container}>
                    <h2 style={styles.title}>Tendencia de Calidad del Aire</h2>
                    <div style={{ alignItems: 'center' }}>
                        <LineChart width={600} height={300} data={data.forecast.forecastday}>
                            <Line type="monotone" dataKey="day.maxtemp_c" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                </div>

                <div style={styles.container}>
                    <h2 style={styles.title}>Pronóstico de 5 días</h2>
                    {data.forecast.forecastday.map(item => (
                        <Card
                            key={item.date}
                            fecha={item.date}
                            iko={item.day.condition.icon}
                            condicion={item.day.condition.text}
                            max={item.day.maxtemp_c}
                            min={item.day.mintemp_c}
                        />
                    ))}
                </div>

                <div style={styles.container}>
                    <h2 style={styles.title}>Pronóstico de 24 horas</h2>
                    {data.forecast.forecastday[0].hour.map(item => (
                        <CardDias
                            key={item.time}
                            temperatura={item.temp_c}
                            ico={item.condition.icon}
                            vel={item.wind_kph}
                            hora={item.time}
                        />
                    ))}
                </div>

                <div style={styles.vContainer}>
                    <div>
                        <div style={styles.container}>
                            <p style={styles.datosBold}>{data.current.wind_dir}</p>
                            <p style={styles.datosBold}>{data.current.wind_kph} km/h</p>
                        </div>
                        <div style={styles.container}>
                            <div style={styles.vContainer}>
                                <p style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunrise}</p>
                                <p style={styles.texto}> Amanecer</p>
                            </div>
                            <div style={styles.vContainer}>
                                <p style={styles.datosBold}>{data.forecast.forecastday[0].astro.sunset}</p>
                                <p style={styles.texto}> Anochecer</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ ...styles.container, marginLeft: -5 }}>
                        <Datos dato="Humedad" valor={`${data.current.humidity}%`} />
                        <Datos dato="Sensación real" valor={`${data.current.feelslike_c}°`} />
                        <Datos dato="UV" valor={data.current.uv} />
                        <Datos dato="Presión" valor={`${data.current.pressure_mb} mbar`} />
                        <Datos dato="Prob. de lluvia" valor={`${data.forecast.forecastday[0].day.daily_chance_of_rain}%`} />
                    </div>
                </div>
            </div>
        );
    };

    const Uscreen = () => (
        <div style={styles.loadingContainer}>
            <Spinner animation="border" role="status">
                <span className="sr-only">Cargando datos...</span>
            </Spinner>
            <p>Cargando datos...</p>
        </div>
    );

    return (
        <div style={styles.root}>
            {load ? <LScreen /> : <Uscreen />}
        </div>
    );
};

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#001f3f',
    },
    scrollContainer: {
        backgroundColor: '#001f3f',
        padding: '10px',
    },
    datos: {
        color: 'white',
    },
    datosBold: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px',
    },
    title: {
        color: '#AFCAF3',
        fontWeight: 'bold',
        marginBottom: '15px',
        fontSize: '16px',
    },
    texto: {
        color: '#AFCAF3',
    },
    container: {
        backgroundColor: '#4183D1',
        marginHorizontal: '15px',
        borderRadius: '20px',
        padding: '15px',
        marginBottom: '10px',
    },
    hContainer: {
        marginRight: '25px',
        alignItems: 'center',
    },
    vContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    datosContainer: {
        alignItems: 'center',
        marginBottom: '10px',
        padding: '30px',
    },
    lugar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '25px',
        marginBottom: '60px',
        marginTop: '0',
    },
    temperatura: {
        color: 'white',
        fontSize: '80px',
        marginTop: '-30px',
        textAlign: 'center',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#001f3f',
    },
    mapContainer: {
        height: '400px',
        marginBottom: '20px',
    },
    map: {
        height: '100%',
        width: '100%',
    },
};

export default Clima;
