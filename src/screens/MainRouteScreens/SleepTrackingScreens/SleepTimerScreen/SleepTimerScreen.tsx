import { View } from 'native-base';
import React from 'react';
import SleepTimer from '../components/SleepTimer';
import tw from 'twrnc';

import { ScrollView, Text } from 'react-native';
import { getFormattedDate } from '.././../../../utils/greetingMessage';
import { ShareSVG } from '@vs/assets';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from '@vs/components';
import { colors } from '@vs/constants';
type SleepTrackerScreenProps = StackScreenProps<
  Record<string, object | undefined>,
  'SleepTimerScreen'
>;
export function SleepTimerScreen({ navigation }: SleepTrackerScreenProps) {
  const today = getFormattedDate();
  return (
    <ScrollView>
      <View style={tw`mx-6 `}>
        <View style={tw`flex flex-row  justify-between items-center my-10`}>
          <View>
            <Text style={tw`text-lg text-black`}>Sleep Analytics</Text>
            <Text>{today}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <ShareSVG />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex  justify-center`}>
          <SleepTimer />
          <TouchableOpacity style={tw`mb-8 px-6 rounded-full mb-4`}>
            <Button
              onPress={() => navigation.navigate('SleepAnalyticsScreen')}
              pressedButtonColor={colors.lightGrey}
              bgColor={colors.secondary[600]}
              title="Show my sleep pattern"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
