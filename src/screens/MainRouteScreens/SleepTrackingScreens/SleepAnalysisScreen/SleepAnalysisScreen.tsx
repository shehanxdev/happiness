import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import tw from 'twrnc';
import { colors } from '@vs/constants';
import { SleepChart } from '../components/SleepChart';
import { executeQuery } from './../../../../services/DB.service';
import { useFocusEffect } from '@react-navigation/native';
interface SleepRecord {
  id: number;
  sleepTime: string;
  wakeTime: string;
  duration: number;
  date: Date;
}

export function SleepAnalysisScreen() {
  const [lastSleepData, setLastSleepData] = useState<SleepRecord>();
  const durationInHours = lastSleepData?.duration
    ? (lastSleepData.duration / 3600).toFixed(1)
    : '0.0';
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const sql = `
        SELECT * FROM SleepInfo;
        ORDER BY Id DESC;
      `;
        const result = await executeQuery<SleepRecord>(sql, [], false);
        if (Array.isArray(result)) {
          console.log(result);
          setLastSleepData(result[0]);
        } else {
          console.log('No records found or unexpected result format');
        }
      };
      getData();
    }, [])
  );
  return (
    <ScrollView>
      <View style={tw`my-10 mx-6`}>
        <Text style={tw`mb-10 text-4xl text-black text-center`}>
          Sleep Overview
        </Text>
        <Text style={tw`text-lg mb-4 text-black`}>
          Your last sleep information
        </Text>
        <View style={tw`rounded bg-white p-3 shadow`}>
          <View style={tw`flex gap-8 flex-wrap justify-between px-12`}>
            <View style={tw`flex flex-row  justify-between `}>
              <View>
                <Text style={tw`text-center  text-lg text-black`}>Bedtime</Text>
                <Text
                  style={tw`text-center text-lg font-bold text-black text-[${colors.primary[400]}]`}>
                  {lastSleepData?.sleepTime}
                </Text>
              </View>
              <View>
                <Text style={tw`text-center  text-lg text-black`}>Wake up</Text>
                <Text
                  style={tw`text-center text-lg font-bold text-black text-[${colors.primary[400]}]`}>
                  {lastSleepData?.wakeTime}
                </Text>
              </View>
            </View>
            <View style={tw`flex flex-row  justify-between `}>
              <View>
                <Text style={tw`text-center  text-lg text-black`}>Total</Text>
                <Text
                  style={tw`text-center text-lg font-bold text-black text-[${colors.primary[400]}]`}>
                  {durationInHours}h
                </Text>
              </View>
              <View>
                <Text style={tw`text-lg text-black`}>Quality</Text>
                <Text
                  style={tw`text-center text-lg font-bold text-black text-${
                    parseFloat(durationInHours) >= 7
                      ? `[${colors.primary[400]}]`
                      : 'red-500'
                  }`}>
                  {parseFloat(durationInHours) >= 7 ? 'Good' : 'Bad'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={tw`my-12`}>
          <SleepChart />
        </View>
      </View>
    </ScrollView>
  );
}
