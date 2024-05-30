import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const region = {
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const markers = [
    {
      coordinate: {
        latitude: 19.4326,
        longitude: -99.1332,
      },
      title: "CDMX",
      description: "Calidad del aire: Buena",
    },
    // Agrega más marcadores aquí si es necesario
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
