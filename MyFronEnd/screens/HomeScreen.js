import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido a React Native</Text>
      <Button
        title="Mostrar Datos de Calidad del Aire"
        onPress={() => navigation.navigate('Data')}
      />
      <Button
        title="Mostrar Datos Meteorológicos"
        onPress={() => navigation.navigate('Weather')}
      />
      <Button
        title="Mostrar Mapa y Datos"
        onPress={() => navigation.navigate('Combined')}
      />
      <Button
        title="Mostrar Gráficos"
        onPress={() => navigation.navigate('Charts')}
      />
      <Button
        title="Predicciones"
        onPress={() => navigation.navigate('Prediction')}
      />
       <Button
        title="Clima_Prediccion"
        onPress={() => navigation.navigate('Clima')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default HomeScreen;
