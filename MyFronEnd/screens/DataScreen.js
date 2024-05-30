import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const DataScreen = () => {
  const [airData, setAirData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/airquality/`);
        const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAirData(sortedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={airData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Location: {item.location}</Text>
            <Text style={styles.text}>PM2.5: {item.pm25}</Text>
            <Text style={styles.text}>PM10: {item.pm10}</Text>
            <Text style={styles.text}>NO2: {item.no2}</Text>
            <Text style={styles.text}>O3: {item.o3}</Text>
            <Text style={styles.text}>CO: {item.co}</Text>
            <Text style={styles.text}>Date: {new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default DataScreen;
