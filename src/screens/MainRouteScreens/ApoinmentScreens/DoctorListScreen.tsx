import { StackScreenProps } from '@react-navigation/stack';
import { colors } from '@vs/constants';
import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc';

export interface DoctorCardProps {
  id: number;
  doctorName: string;
  specialty: string;
  availability: boolean;
  currentQueueNumber: number;
}
type DoctorListScreenScreenProps = StackScreenProps<
  Record<string, object | undefined>,
  'DoctorListScreen'
>;
export function DoctorListScreen({ navigation }: DoctorListScreenScreenProps) {
  // Define the array of doctors using useState
  const [doctors] = useState<DoctorCardProps[]>([
    {
      id: 1,
      doctorName: 'Dr. Jane Doe',
      specialty: 'Cardiologist',
      availability: true,
      currentQueueNumber: 3
    },
    {
      id: 2,
      doctorName: 'Dr. John Smith',
      specialty: 'Dentist',
      availability: false,
      currentQueueNumber: 0
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Clark',
      specialty: 'Neurologist',
      availability: true,
      currentQueueNumber: 5
    },
    {
      id: 4,
      doctorName: 'Dr. Robert Wilson',
      specialty: 'Dermatologist',
      availability: true,
      currentQueueNumber: 1
    },
    {
      id: 5,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Pediatrician',
      availability: true,
      currentQueueNumber: 0
    }
  ]);

  return (
    <ScrollView style={tw`p-4`}>
      {doctors.map(doctor => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DoctorProfileScreen', { doctor })}
          key={doctor.id}
          style={tw` my-2 mb-8 bg-white rounded-lg flex  shadow-md `}>
          <View style={tw`w-100 `}>
            <Image
              style={tw`w-100 h-70 `}
              source={require('../../../assets/docImages/1.jpg')}
            />
          </View>
          {/* Doctor's Info */}
          <View style={tw`flex-row justify-between items-center p-4`}>
            <View>
              <Text style={tw`text-lg font-bold`}>{doctor.doctorName}</Text>
              <Text style={tw`text-gray-500`}>{doctor.specialty}</Text>
            </View>

            <View>
              {doctor.availability ? (
                <Text style={tw`text-sm text-[${colors.primary[400]}]`}>
                  Available - Queue: {doctor.currentQueueNumber}
                </Text>
              ) : (
                <Text style={tw`text-sm text-red-700`}>Not Available</Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
