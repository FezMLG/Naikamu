import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthRoutesNames, AuthStackParamList } from './interfaces';
import LoginPage from '../pages/auth/LoginPage';
import { SignUpPage } from '../pages/auth/SignupPage';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={AuthRoutesNames.Login}>
      <Stack.Screen
        name={AuthRoutesNames.Login}
        component={LoginPage}
        options={{ header: () => null }}
      />
      <Stack.Screen name={AuthRoutesNames.SignUp} component={SignUpPage} />
    </Stack.Navigator>
  );
}
