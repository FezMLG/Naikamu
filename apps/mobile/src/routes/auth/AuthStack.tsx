import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList, AuthStackRoutesNames } from './auth.interfaces';
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

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator initialRouteName={AuthStackRoutesNames.AppLoading}>
      <Stack.Screen
        name={AuthStackRoutesNames.AppLoading}
        component={AppLoadScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AuthStackRoutesNames.Hello}
        component={HelloScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AuthStackRoutesNames.Login}
        component={LoginScreen}
        options={{
          title: translate('routes.' + AuthStackRoutesNames.Login),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={AuthStackRoutesNames.SignUp}
        component={SignUpScreen}
        options={{
          title: translate('routes.' + AuthStackRoutesNames.SignUp),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={AuthStackRoutesNames.VerifyEmail}
        component={VerifyEmailScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AuthStackRoutesNames.ForgotPassword}
        component={ForgotPasswordScreen}
        options={{
          title: translate('routes.' + AuthStackRoutesNames.ForgotPassword),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={AuthStackRoutesNames.ActionRequired}
        component={ActionRequiredScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
