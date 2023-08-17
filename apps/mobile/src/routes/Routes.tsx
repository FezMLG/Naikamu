import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './main/MainStack';
import AuthStack from './auth/AuthStack';
import { ScreenNames } from './main';
import SplashScreen from '../screens/SplashScreen';
import { useUserStore } from '../services/auth/user.store';

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
  const user = useUserStore(state => state.user);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<SplashScreen />}
      theme={theme}>
      {user && user?.emailVerified ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
