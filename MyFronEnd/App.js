import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DataScreen from './screens/DataScreen';
import WeatherScreen from './screens/WeatherScreen';
import CombinedScreen from './screens/CombinedScreen';
import ChartScreen from './screens/ChartScreen';
import PredictionScreen from './screens/PredictionScreen';
import Clima from './screens/Clima'; // Asegúrate de que la ruta sea correcta
import AirQualityScale from './screens/AirQualityScale';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Data" component={DataScreen} />
    <Stack.Screen name="Weather" component={WeatherScreen} />
    <Stack.Screen name="Combined" component={CombinedScreen} />
    <Stack.Screen name="Charts" component={ChartScreen} />
    <Stack.Screen name="Prediction" component={PredictionScreen} />
    <Stack.Screen name="Clima" component={Clima} />
  </Stack.Navigator>
);
9
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Clima" component={Clima} />
        <Tab.Screen name="Escala" component={AirQualityScale} />
        <Tab.Screen name="Prediction" component={PredictionScreen} />
        {/* Agrega más Tab.Screen según sea necesario */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
