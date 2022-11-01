import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen } from '../../screens/auth/SignUpScreen';
import AppLoadScreen from '../../screens/AppLoadScreen';
import { AuthStackParamList, AuthRoutesNames } from './interfaces';
import LoginScreen from '../../screens/auth/LoginScreen';
import HelloScreen from '../../screens/HelloScreen';
import VerifyEmailScreen from '../../screens/VerifyEmailScreen';
import { useTranslate } from '../../i18n/useTranslate';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const { translate } = useTranslate();

  return (
    <Stack.Navigator initialRouteName={AuthRoutesNames.AppLoading}>
      <Stack.Screen
        name={AuthRoutesNames.AppLoading}
        component={AppLoadScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AuthRoutesNames.Hello}
        component={HelloScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AuthRoutesNames.Login}
        component={LoginScreen}
        options={{
          title: translate('routes.' + AuthRoutesNames.Login),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={AuthRoutesNames.SignUp}
        component={SignUpScreen}
        options={{
          title: translate('routes.' + AuthRoutesNames.SignUp),
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={AuthRoutesNames.VerifyEmail}
        component={VerifyEmailScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
