import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTranslate } from '../../i18n/useTranslate';
import {
  ActionRequiredScreen,
  AppLoadScreen,
  ForgotPasswordScreen,
  HelloScreen,
  LoginScreen,
  SignUpScreen,
  VerifyEmailScreen,
} from '../../screens';

import {
  AuthStackParameterList as AuthStackParameterList,
  AuthStackRoutesNames,
} from './auth.interfaces';

const Stack = createNativeStackNavigator<AuthStackParameterList>();

export function AuthStack() {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator
      initialRouteName={AuthStackRoutesNames.AppLoading}
      screenOptions={{
        orientation: 'portrait',
      }}>
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
        component={LoginScreen}
        name={AuthStackRoutesNames.Login}
        options={{
          title: translate('routes.' + AuthStackRoutesNames.Login),
        }}
      />
      <Stack.Screen
        component={SignUpScreen}
        name={AuthStackRoutesNames.SignUp}
        options={{
          title: translate('routes.' + AuthStackRoutesNames.SignUp),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        component={VerifyEmailScreen}
        name={AuthStackRoutesNames.VerifyEmail}
        options={{ header: () => null }}
      />
      <Stack.Screen
        component={ForgotPasswordScreen}
        name={AuthStackRoutesNames.ForgotPassword}
        options={{
          title: translate('routes.' + AuthStackRoutesNames.ForgotPassword),
          animation: 'slide_from_right',
        }}
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
