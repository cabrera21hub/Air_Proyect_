import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

const Grafica_Air = ({ data }) => {
  if (!Array.isArray(data)) {
    console.error('Expected data to be an array, but received:', data);
    return <Text>No data available</Text>;
  }

  // Asegúrate de que todos los elementos tengan la propiedad 'Fecha'
  const validData = data.filter(item => item.Fecha && !isNaN(item['Predicción_PM2.5']));

  if (validData.length === 0) {
    return <Text>No hay datos válidos para mostrar</Text>;
  }

  const labels = validData.map(item => item.Fecha.split('T')[0]);
  const predictedPm25 = validData.map(item => item['Predicción_PM2.5']);

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
      <YAxis
        data={predictedPm25}
        contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}`}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={predictedPm25}
          svg={{
            strokeWidth: 2,
            stroke: 'rgb(134, 65, 244)',
            fill: 'url(#gradient)',
          }}
          contentInset={contentInset}
          curve={shape.curveNatural}
        >
          <Grid />
          <Defs key="gradient">
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="rgb(134, 65, 244)" stopOpacity={0.8} />
              <Stop offset="100%" stopColor="rgb(134, 65, 244)" stopOpacity={0.2} />
            </LinearGradient>
          </Defs>
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={predictedPm25}
          formatLabel={(value, index) => labels[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'grey' }}
        />
      </View>
    </View>
  );
};

export default Grafica_Air;
