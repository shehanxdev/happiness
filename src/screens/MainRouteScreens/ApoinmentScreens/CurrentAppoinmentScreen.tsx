import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
// Import the AppointmentCard component
import tw from 'twrnc';
import AppointmentCard from './components/AppoinmentCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fab } from 'native-base';
import { AddSVG } from '@vs/assets';
import { colors } from '@vs/constants';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getFormattedDate } from '../../../utils/greetingMessage';
import { executeQuery } from './../../../services/DB.service';
import { getCurrentDate } from '../../../utils/time.util';

interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  appointmentTime: string;
  queueNumber: number;
  doctorImage?: string;
}
interface AppointmentForDB {
  id: number;
  docName: string;
  speciality: string;
  appointmentTime: string;
  queueNumber: number;
  doctorImage?: string;
}
type CurrentAppoinmentListScreenProps = StackScreenProps<
  Record<string, object | undefined>,
  'CurrentAppoinmentListScreen'
>;
export function CurrentAppoinmentListScreen({
  navigation
}: CurrentAppoinmentListScreenProps) {
  const isFocused = useIsFocused();
  const [appointments, setAppointments] = useState<AppointmentForDB[]>();

  useFocusEffect(
    React.useCallback(() => {
      const fetchAppointments = async () => {
        try {
          const sql = `SELECT * FROM Appoinments `;
          const result = await executeQuery(sql, [], false);

          if (Array.isArray(result)) {
            setAppointments(result);
          } else {
            console.log('No records found or unexpected result format');
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchAppointments();
    }, [])
  );
  return (
    <ScrollView style={tw`p-4 `}>
      <Text
        style={tw`my-5`}>{`Appoinments you have for ${getFormattedDate()}`}</Text>
      {appointments?.map(appointment => (
        <TouchableOpacity key={appointment.id}>
          <AppointmentCard
            doctorName={appointment.docName}
            specialty={appointment.speciality}
            appointmentTime={appointment.appointmentTime}
            queueNumber={appointment.queueNumber}
            doctorImage="https://example.com/doctor-image5.jpg"
          />
        </TouchableOpacity>
      ))}
      {/* //Add padding to display last card */}
      <View style={tw`mt-18`}></View>
      <View>
        {isFocused && (
          <Fab
            icon={<AddSVG />}
            position="absolute"
            style={tw`mb-20 bg-[${colors.primary[300]}]`}
            onPress={() => {
              navigation.navigate('DoctorListScreen');
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}
