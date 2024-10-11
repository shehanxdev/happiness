import { SleepingMoonSVG } from '@vs/assets';
import { colors } from '@vs/constants';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

import tw from 'twrnc';
import { getGreeting } from './../../../../utils/greetingMessage';
import { Button } from '@vs/components';
import { executeQuery } from './../../../../services/DB.service';
import Toast from 'react-native-toast-message';
import { getTime } from './../../../../utils/time.util';

const SleepTimer: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const totalSleepTime = 8 * 60 * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (timInSeconds: number): string => {
    const hours = Math.floor(timInSeconds / 3600);
    const minutes = Math.floor((timInSeconds % 3600) / 60);
    const seconds = (timInSeconds % 3600) % 60;
    return `${hours}h ${minutes}min ${seconds}s`;
  };
  const getDayOfWeekAsInt = (): number => {
    const date = new Date();
    const day = date.getDay();
    return (day + 6) % 7;
  };

  const greeting = getGreeting();
  const handleOnSave = async () => {
    const sql = `
    INSERT INTO SleepInfo (sleepTime, wakeTime, duration, date)
    VALUES ('${startTime}', '${endTime}', ${timeElapsed}, ${getDayOfWeekAsInt()})
    ON CONFLICT(date) DO UPDATE SET duration = ${timeElapsed},sleepTime='${startTime}',wakeTime='${endTime}';
  `;
    const result = await executeQuery(sql, [], true);
    if (result) {
      Toast.show({ type: 'success', text1: 'Sleep Info Saved' });
    }
  };

  return (
    <ScrollView>
      <View style={tw`flex justify-center items-center gap-10  relative`}>
        <Text style={tw`mb-20 text-4xl text-black`}>{`${greeting}!`}</Text>

        <View>
          <CircularProgress
            size={200}
            width={10}
            fill={(timeElapsed / totalSleepTime) * 100}
            tintColor={colors.primary[400]}
            backgroundColor="#c3c3c3"
            rotation={0}
            lineCap="round">
            {() => (
              <View style={tw`flex items-center gap-4 justify-center`}>
                <Text style={tw`text-lg text-center text-gray-500`}>
                  {formatTime(timeElapsed)}
                </Text>
                <SleepingMoonSVG />
              </View>
            )}
          </CircularProgress>
        </View>

        <View style={tw`w-full `}>
          <TouchableOpacity style={tw`  px-6 rounded-full mb-4`}>
            <Button
              bgColor={colors.primary[400]}
              onPress={() => {
                if (!isTracking) {
                  setStartTime(getTime());
                } else {
                  setEndTime(getTime());
                }
                setIsTracking(!isTracking);
              }}
              title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={tw` px-6 rounded-full mb-4`}>
            <Button
              onPress={() => setTimeElapsed(0)}
              pressedButtonColor={colors.lightGrey}
              bgColor={colors.secondary[600]}
              title="Reset"
            />
          </TouchableOpacity>
          <TouchableOpacity style={tw` px-6 rounded-full mb-4`}>
            <Button
              onPress={() => handleOnSave()}
              pressedButtonColor={colors.lightGrey}
              bgColor={colors.secondary[600]}
              title="Save"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SleepTimer;
