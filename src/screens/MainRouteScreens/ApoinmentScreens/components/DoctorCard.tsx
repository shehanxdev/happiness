import { DoctorSVG } from '@vs/assets';
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export interface DoctorCardProps {
  doctorName: string;
  specialty: string;
  avalability: boolean;
  currentQueNumber: number;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctorName,
  specialty,
  avalability,
  currentQueNumber
}) => {
  return (
    <View style={tw`flex-row p-4 bg-white rounded-lg shadow-md my-2`}>
      {/* Doctor's Image */}
      {/* <Image
        source={{ uri: doctorImage }} // assuming it's a URL, if local use require
        style={tw`w-20 h-20 rounded-full mr-4`}
      /> */}
      <DoctorSVG />

      {/* Doctor's Details */}
      <View style={tw`flex-1 justify-center`}>
        <Text style={tw`text-lg font-bold`}>{doctorName}</Text>
        <Text style={tw`text-sm text-gray-500`}>{specialty}</Text>
        <Text style={tw`text-sm mt-2 text-blue-600`}>{avalability}</Text>
        <Text style={tw`text-sm text-blue-600`}>
          Current Queue Number: {currentQueNumber}
        </Text>
      </View>
    </View>
  );
};
