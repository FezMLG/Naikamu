import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './main/MainStack';
import AuthStack from './auth/AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from '../services/redux/store';
import { ScreenNames } from './main';
import SplashScreen from '../screens/SplashScreen';

const linking = {
  prefixes: ['aniwatch://'],
  config: {
    screens: {
      [ScreenNames.Browse]: 'browse',
      [ScreenNames.Series]: 'browse/:id',
    },
  },
};

const Routes = ({ theme }: any) => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<SplashScreen />}
      theme={theme}>
      {user && user.emailVerified ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
