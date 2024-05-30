import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DataScreen from './screens/DataScreen';
import WeatherScreen from './screens/WeatherScreen';
import CombinedScreen from './screens/CombinedScreen';
import ChartScreen from './screens/ChartScreen';
import PredictionScreen from './screens/PredictionScreen';
import PredictionClima from './screens/Clima';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Data" component={DataScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Combined" component={CombinedScreen} />
        <Stack.Screen name="Charts" component={ChartScreen} />
        <Stack.Screen name="Prediction" component={PredictionScreen} />
        <Stack.Screen name="Clima" component={PredictionClima} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
