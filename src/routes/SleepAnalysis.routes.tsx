import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from '../screens/QuestionsRouteScreens/WelcomeScreen/WelcomeScreen';
import { QuestionScreen } from '../screens/QuestionsRouteScreens/QuestionScreen/QuestionScreen';
import { MainStackNavigator } from './Main.routes';
import { QuestionStackParamList, SleepAnalysisParamList } from './route.types';
import { SleepAnalysisScreen, SleepTimerScreen } from '@vs/screens';

const SleepAnalysisAndGoalDiaryStack =
  createStackNavigator<SleepAnalysisParamList>();

export const SleepAnalysisAndGoalDiaryStackNavigator = () => {
  return (
    <SleepAnalysisAndGoalDiaryStack.Navigator
      initialRouteName="SleepTimerScreen"
      screenOptions={{ headerShown: false }}>
      <SleepAnalysisAndGoalDiaryStack.Screen
        name="SleepTimerScreen"
        component={SleepTimerScreen}
      />
      <SleepAnalysisAndGoalDiaryStack.Screen
        name="SleepAnalyticsScreen"
        component={SleepAnalysisScreen}
      />
    </SleepAnalysisAndGoalDiaryStack.Navigator>
  );
};
