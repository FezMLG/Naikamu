import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUpScreen } from '../../screens/auth/SignUpScreen';
import AppLoadScreen from '../../screens/AppLoadScreen';
import { AuthStackParamList, AuthRoutesNames } from './interfaces';
import LoginScreen from '../../screens/auth/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={AuthRoutesNames.AppLoading}>
      <Stack.Screen
        name={AuthRoutesNames.AppLoading}
        component={AppLoadScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AuthRoutesNames.Hello}
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name={AuthRoutesNames.Login}
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name={AuthRoutesNames.SignUp} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
