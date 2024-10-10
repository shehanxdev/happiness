import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GoalDiaryParamList } from './route.types';
import { AddGoalsScreen, GoalDiaryListScreen } from '@vs/screens';

const GoalDiaryStack = createStackNavigator<GoalDiaryParamList>();

export const GoalDiaryStackNavigator = () => {
  return (
    <GoalDiaryStack.Navigator
      initialRouteName="GoalDiaryListScreen"
      screenOptions={{ headerShown: false }}>
      <GoalDiaryStack.Screen
        name="GoalDiaryListScreen"
        component={GoalDiaryListScreen}
      />
      <GoalDiaryStack.Screen
        name="CreateGoalDiaryScreen"
        component={AddGoalsScreen}
      />
    </GoalDiaryStack.Navigator>
  );
};
