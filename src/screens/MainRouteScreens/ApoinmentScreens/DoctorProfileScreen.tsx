import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import tw from 'twrnc'; // Tailwind utility
import { DoctorCardProps } from './DoctorListScreen';
import { AppoinmentStackParamList } from '../../../routes/route.types';
import { Button } from '@vs/components';

type DoctorProfileScreenProps = StackScreenProps<
  AppoinmentStackParamList,
  'DoctorProfileScreen'
>;

export function DoctorProfileScreen({
  route,
  navigation
}: DoctorProfileScreenProps) {
  const { doctor } = route.params as { doctor: DoctorCardProps };

  const doctorQualifications = [
    'MBBS from Harvard Medical School',
    'MD from John Hopkins University',
    'PhD in Cardiology from Oxford University'
  ];

  return (
    <ScrollView style={tw` p-4 flex flex-1`}>
      <View style={tw`flex flex-col justify-between`}>
        <View style={tw`mb-16`}>
          <View style={tw`bg-white rounded-lg shadow-md p-4 mb-6`}>
            <Image
              source={require('../../../assets/docImages/1.jpg')}
              style={tw`w-full h-60 rounded-md mb-4`}
              resizeMode="cover"
            />

            <View>
              <Text style={tw`text-xl font-bold mb-2`}>
                {doctor.doctorName}
              </Text>
              <Text style={tw`text-base text-gray-600 mb-2`}>
                Specialty: {doctor.specialty}
              </Text>
              <Text style={tw`text-sm text-gray-500 mb-4`}>
                Location: National Hospital of {doctor.specialty}
              </Text>
              <Text style={tw`text-sm text-gray-500`}>
                Experience: 15 years in {doctor.specialty}
              </Text>
            </View>
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-bold mb-2`}>Qualifications</Text>
            {doctorQualifications.map((qualification, index) => (
              <Text key={index} style={tw`text-sm text-gray-600 mb-1`}>
                • {qualification}
              </Text>
            ))}
          </View>
        </View>
        <Button
          onPress={() => navigation.navigate('AddAppoinmentScreen', { doctor })}
          title="Book an appoinment"></Button>
      </View>
    </ScrollView>
  );
}
