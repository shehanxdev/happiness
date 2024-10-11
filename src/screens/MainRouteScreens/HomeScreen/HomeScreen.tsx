import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { colors } from '@vs/constants';
import {
  AngryFaceSvg,
  CalendarSVG,
  DiarySVG,
  DoctorSVG,
  HappyFaceSvg,
  NeutralFaceSvg,
  SadFaceSvg,
  SleepSVG
} from '@vs/assets';
import { TouchableOpacity, ScrollView } from 'react-native';
import { MoodCalendar } from './MoodCalendarScreen';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ReactNativeModal } from 'react-native-modal';
import { executeQuery } from '../../../services';
import { MainStackParamList } from 'src/routes/route.types';

type HomeScreenProps = StackScreenProps<MainStackParamList, 'HomeScreen'>;
interface EmotionData {
  id: number;
  emotion: string;
  date: string;
}

export const HomeScreen = ({ route, navigation }: HomeScreenProps) => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(true);
  const [emotion, setEmotion] = useState<string>();
  const resetApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'WelcomeScreen' }]
      })
    );
  };
  useEffect(() => {
    console.log(route.params);
    if (route.params?.emotion) {
      setEmotion(route.params.emotion);
    }
  }, [route.params?.emotion]);

  const getEmotionEmoji = () => {
    if (emotion == 'Happy') {
      return <HappyFaceSvg />;
    } else if (emotion == 'Sad') {
      return <SadFaceSvg />;
    } else if (emotion == 'Neutral') {
      return <NeutralFaceSvg />;
    } else if (emotion == 'Angry') {
      return <AngryFaceSvg />;
    }
  };
  function getEmotionMessage(emotion: string): string {
    switch (emotion.toLowerCase()) {
      case 'happy':
        return 'Yay! Keep it up! 😊';
      case 'neutral':
        return 'Stay calm and balanced. Everything is fine.';
      case 'sad':
        return "It's okay to feel sad sometimes. Take it easy, things will get better.";
      case 'angry':
        return "Take a deep breath. It's important to stay in control and find a way to cool down.";
      default:
        return "Emotion not recognized. But remember, it's always okay to feel how you feel!";
    }
  }
  return (
    <View>
      {emotion && (
        <ReactNativeModal
          backdropColor="#000000"
          backdropOpacity={0.9}
          coverScreen={false}
          isVisible={modalVisibility}
          onBackdropPress={() => setModalVisibility(false)}>
          <View
            style={tw`flex-1 justify-center items-center bg-opacity-50 bg-black p-4`}>
            <View style={tw`bg-white p-4 rounded-lg w-full`}>
              <Text style={tw`text-lg font-bold mb-4 text-center`}>
                Hello there!!
              </Text>
              <View style={tw`m-auto`}>{getEmotionEmoji()}</View>
              <Text style={tw` my-4 font-bold mb-4 text-center`}>
                You look {emotion}
              </Text>
              <Text style={tw` my-4 font-bold mb-4 text-center`}>
                {getEmotionMessage(emotion)}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisibility(false)}
                style={tw`mt-2 bg-red-500  py-2 px-4 rounded-lg`}>
                <Text style={tw`text-center text-white `}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ReactNativeModal>
      )}

      <ScrollView style={tw`flex  p-5`}>
        <Text style={tw`text-3xl pt-5 text-[${colors.primary[600]}]`}>
          Hello, Dave!
        </Text>
        <View style={tw`mt-10`}>
          <MoodCalendar />
        </View>
        <Text style={tw`text-lg pt-18`}>How do you feel today?</Text>
        <View style={tw`flex-row justify-center gap-10 mt-4`}>
          <TouchableOpacity>
            <HappyFaceSvg />
            <Text style={tw`mt-2`}>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <NeutralFaceSvg />
            <Text style={tw`mt-2`}>Neutral</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <SadFaceSvg />
            <Text style={tw`mt-2`}>Sad</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <AngryFaceSvg />
            <Text style={tw`mt-2`}>Angry</Text>
          </TouchableOpacity>
        </View>
        <View
          style={tw`shadow border-black shadow-gray-100 py-6 px-5 rounded-sm italic mt-8`}>
          <Text style={tw`italic`}>
            Our biggest weakness is giving up. Most certain to succeed The trick
            is to always try one more time.
          </Text>
          <Text>-Thomas Edison-</Text>
        </View>
        <View>
          <Text style={tw`my-10 text-lg`}>
            What would you like to do today?
          </Text>
          <View style={tw`mb-5 flex-row justify-center gap-10`}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AppoinmentStack', {})}
              style={tw`flex border-2 bg-white  border-black rounded-lg p-4`}>
              <DoctorSVG />
              <Text style={tw`text-center`}>Visit a doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SleepAnalysisStack', {})}
              style={tw`flex border-2  bg-white  border-black rounded-lg p-4`}>
              <SleepSVG />
              <Text style={tw`text-center`}>Track Sleep</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`mb-10 flex-row justify-center gap-10`}>
            <TouchableOpacity
              onPress={resetApp}
              style={tw`flex border-2 bg-white  border-black rounded-lg p-4`}>
              <CalendarSVG />
              <Text style={tw`text-center`}>Mood Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('GoalDiaryStack', {})}
              style={tw`flex border-2 bg-white  border-black rounded-lg p-4`}>
              <DiarySVG />
              <Text style={tw`text-center`}>Goal Diary</Text>
            </TouchableOpacity>
          </View>
          <Text style={tw`mb-10 text-center`}>Made with ❤️ in Sri Lanka</Text>
        </View>
      </ScrollView>
    </View>
  );
};
