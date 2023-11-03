import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ActionRequiredScreen,
  AppLoadScreen,
  HelloScreen,
} from '../../screens';

import {
  AuthStackParameterList as AuthStackParameterList,
  AuthStackRoutesNames,
} from './auth.interfaces';

const Stack = createNativeStackNavigator<AuthStackParameterList>();

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={AuthStackRoutesNames.AppLoading}>
      <Stack.Screen
        component={AppLoadScreen}
        name={AuthStackRoutesNames.AppLoading}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={HelloScreen}
        name={AuthStackRoutesNames.Hello}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={ActionRequiredScreen}
        name={AuthStackRoutesNames.ActionRequired}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
