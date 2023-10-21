import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './main/MainStack';
import AuthStack from './auth/AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store/store';
import SplashScreen from '../screens/SplashScreen';

const Routes = ({ theme }: any) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <NavigationContainer fallback={<SplashScreen />} theme={theme}>
      {user && user.emailVerified ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
