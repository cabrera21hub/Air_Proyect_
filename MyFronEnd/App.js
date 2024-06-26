import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de importar los iconos

import HomeScreen from './screens/HomeScreen';
import WeatherScreen from './screens/WeatherScreen';
import CombinedScreen from './screens/CombinedScreen';
import ChartScreen from './screens/ChartScreen';
import PredictionScreen from './screens/PredictionScreen';
import Clima from './screens/Clima';
import AirQualityScale from './screens/AirQualityScale';
import AboutUsScreen from './screens/AboutUsScreen'; // Asegúrate de que la ruta sea correcta
import DatosScreen from './screens/DatosScreen'; // Nueva pantalla de datos

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Weather" component={WeatherScreen} />
    <Stack.Screen name="Combined" component={CombinedScreen} />
    <Stack.Screen name="Charts" component={ChartScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Clima" 
          component={Clima} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="cloud" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Consejos" 
          component={AirQualityScale} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="information-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Datos" 
          component={DatosScreen} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="analytics" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Acerca de Nosotros" 
          component={AboutUsScreen} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="people" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
