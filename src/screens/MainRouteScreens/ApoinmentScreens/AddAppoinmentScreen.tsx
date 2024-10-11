import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { StackScreenProps } from '@react-navigation/stack';
import { AppoinmentStackParamList } from '../../../routes/route.types';
import { Button } from '@vs/components';
import { DoctorCardProps } from './DoctorListScreen';
import { executeQuery } from './../../../services/DB.service';
import Toast from 'react-native-toast-message';

type AddAppointmentScreenProps = StackScreenProps<
  AppoinmentStackParamList,
  'AddAppoinmentScreen'
>;

export function AddAppointmentScreen({
  route,
  navigation
}: AddAppointmentScreenProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { doctor } = route.params as { doctor: DoctorCardProps };

  const availableTimeSlots = [
    '10:00 AM',
    '11:30 AM',
    '12:00 PM',
    '05:00 AM',
    '10:00 PM'
  ];

  const handleTimeSlotSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleDateSelection = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const bookAppoinment = async () => {
    const sql = `
    INSERT INTO Appoinments (docName, speciality, queueNumber, selectedDate,selectedTime)
    VALUES ('${doctor.doctorName}', '${doctor.specialty}', ${
      doctor.currentQueueNumber + 1
    }, '${selectedDate}','${selectedTime}');`;

    const result = await executeQuery(sql, [], true);

    if (result) {
      Toast.show({ type: 'success', text1: 'Appoinment booked' });
      navigation.navigate('CurrentAppoinmentListScreen', {});
    }
  };
  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <View style={tw`mb-6`}>
        <Calendar
          onDayPress={handleDateSelection}
          markedDates={{
            [selectedDate ?? '']: {
              selected: true,
              marked: true,
              selectedColor: 'blue'
            }
          }}
          theme={{
            selectedDayBackgroundColor: 'blue',
            todayTextColor: 'red',
            arrowColor: 'blue',
            monthTextColor: 'black'
          }}
        />
      </View>

      <Text style={tw`text-lg font-bold mb-4 text-center`}>Select Time</Text>
      <FlatList
        data={availableTimeSlots}
        keyExtractor={item => item}
        numColumns={3}
        columnWrapperStyle={tw`gap-10 mb-4`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`px-4 py-2 rounded-lg ${
              selectedTime === item ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onPress={() => handleTimeSlotSelection(item)}>
            <Text
              style={tw`text-center ${
                selectedTime === item ? 'text-white' : 'text-black'
              }`}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Button
        title="Confirm Appointment"
        onPress={bookAppoinment}
        disabled={!selectedDate || !selectedTime}
      />
    </View>
  );
}
