import { DoctorSVG } from '@vs/assets';
import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  appointmentTime: string;
  queueNumber: number;
  doctorImage?: string; // URL or local image path
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  specialty,
  appointmentTime,
  queueNumber,
  doctorImage
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
        <Text style={tw`text-sm mt-2 text-blue-600`}>
          Appointment Time: {appointmentTime}
        </Text>
        <Text style={tw`text-sm text-blue-600`}>
          Queue Number: {queueNumber}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentCard;
