import { MainStackNavigator } from './Main.routes';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QuestionStackNavigator } from './Questions.routes';

interface RoutesPropType {
  isFirstTime: boolean;
}

export const Routes = ({ isFirstTime }: RoutesPropType) => {
  return (
    <NavigationContainer>
      {isFirstTime ? <QuestionStackNavigator /> : <MainStackNavigator />}
    </NavigationContainer>
  );
};
