import * as React from 'react';

import { HomeScreen } from '../screens/MainRouteScreens/HomeScreen/HomeScreen';

import { CommunityScreen, QuestionScreenWithinMainStack } from '@vs/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CommunityIconSvg,
  HamburgerIconSvg,
  HomeIconSvg,
  UserIconSvg,
  RecommendedTasksSVG,
  SleepMonitorSVG,
  DiarySmallSVG,
  DoctorPersonSVG
} from '@vs/assets';
import { View } from 'react-native';
import tw from 'twrnc';
import { SleepAnalysisAndGoalDiaryStackNavigator } from './SleepAnalysis.routes';
import { GoalDiaryStackNavigator } from './GoalDiary.routes';
import { AppoinmentStackNavigator } from './AppoinmentStack.routes';
import { MainStackParamList } from './route.types';
import { Image } from 'react-native';

const MainStack = createBottomTabNavigator<MainStackParamList>();

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: { elevation: 15, shadowColor: 'black' },
        tabBarIcon: () => {
          switch (route.name) {
            case 'HomeScreen':
              return (
                <View style={tw`mt-4`}>
                  <HomeIconSvg />
                </View>
              );

            case 'QuestionScreen':
              return (
                <View style={tw`mt-4`}>
                  <RecommendedTasksSVG />
                </View>
              );
            case 'SleepAnalysisStack':
              return (
                <View style={tw`mt-4`}>
                  <SleepMonitorSVG />
                </View>
              );
            case 'GoalDiaryStack':
              return (
                <View style={tw`mt-4`}>
                  <DiarySmallSVG />
                </View>
              );
            case 'AppoinmentStack':
              return (
                <View style={tw`mt-4`}>
                  <DoctorPersonSVG />
                </View>
              );
            default:
              return (
                <View style={tw`mt-4`}>
                  <CommunityIconSvg />
                </View>
              );
          }
        },
        tabBarLabel: '',
        headerLeft(_props) {
          return (
            <View style={tw`mx-5 my-4`}>
              <UserIconSvg />
            </View>
          );
        },
        headerRight(_props) {
          return (
            <View style={tw`mx-5 my-4`}>
              <HamburgerIconSvg />
            </View>
          );
        },
        headerTitle: () => (
          <View style={tw` justify-center items-center rounded-full`}>
            <Image
              source={require('../assets/images/logo.jpg')} // Replace with your image URL or require('./path/to/your/image.png')
              style={tw`h-10 w-10 ml-23 rounded-full`} // Adjust size as needed
              resizeMode="contain"
            />
          </View>
        )
      })}>
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <MainStack.Screen
        name="QuestionScreen"
        component={QuestionScreenWithinMainStack}
      /> */}
      <MainStack.Screen
        name="AppoinmentStack"
        component={AppoinmentStackNavigator}
      />
      <MainStack.Screen name="CommunityScreen" component={CommunityScreen} />
      <MainStack.Screen
        name="SleepAnalysisStack"
        component={SleepAnalysisAndGoalDiaryStackNavigator}
      />
      <MainStack.Screen
        name="GoalDiaryStack"
        component={GoalDiaryStackNavigator}
      />
    </MainStack.Navigator>
  );
};
