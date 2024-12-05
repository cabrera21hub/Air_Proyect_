import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const RestrictedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 5);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione una fecha</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        minDate={formatDate(today)}
        maxDate={formatDate(maxDate)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
        theme={{
          todayTextColor: 'red',
          arrowColor: 'blue',
          textMonthFontWeight: 'bold',
        }}
      />
      {selectedDate ? (
        <Text style={styles.selectedDate}>Fecha seleccionada: {selectedDate}</Text>
      ) : (
        <Text style={styles.selectedDate}>Seleccione una fecha</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default RestrictedCalendar;
