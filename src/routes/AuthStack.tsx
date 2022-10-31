import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthRoutesNames, AuthStackParamList } from './interfaces';
import LoginScreen from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={AuthRoutesNames.Login}>
      <Stack.Screen
        name={AuthRoutesNames.Login}
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name={AuthRoutesNames.SignUp} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
