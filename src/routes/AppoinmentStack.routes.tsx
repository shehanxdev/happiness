import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppoinmentStackParamList, GoalDiaryParamList } from './route.types';
import {
  AddAppointmentScreen,
  CurrentAppoinmentListScreen,
  DoctorListScreen,
  DoctorProfileScreen
} from '@vs/screens';

const AppoinmentStack = createStackNavigator<AppoinmentStackParamList>();

export const AppoinmentStackNavigator = () => {
  return (
    <AppoinmentStack.Navigator
      initialRouteName="CurrentAppoinmentListScreen"
      screenOptions={{ headerShown: false }}>
      <AppoinmentStack.Screen
        name="CurrentAppoinmentListScreen"
        component={CurrentAppoinmentListScreen}
      />
      <AppoinmentStack.Screen
        name="DoctorListScreen"
        component={DoctorListScreen}
      />
      <AppoinmentStack.Screen
        name="DoctorProfileScreen"
        component={DoctorProfileScreen}
      />
      <AppoinmentStack.Screen
        name="AddAppoinmentScreen"
        component={AddAppointmentScreen}
      />
    </AppoinmentStack.Navigator>
  );
};
