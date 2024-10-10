import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from '../screens/QuestionsRouteScreens/WelcomeScreen/WelcomeScreen';
import { QuestionScreen } from '../screens/QuestionsRouteScreens/QuestionScreen/QuestionScreen';
import { MainStackNavigator } from './Main.routes';
import { QuestionStackParamList } from './route.types';

const QuestionStack = createStackNavigator<QuestionStackParamList>();

export const QuestionStackNavigator = () => {
  return (
    <QuestionStack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{ headerShown: false }}>
      <QuestionStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <QuestionStack.Screen name="QuestionScreen" component={QuestionScreen} />
      <QuestionStack.Screen name="MainStack" component={MainStackNavigator} />
    </QuestionStack.Navigator>
  );
};
