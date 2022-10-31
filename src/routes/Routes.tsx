import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import { RoutesNames } from './interfaces';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store/store';

const linking = {
  prefixes: ['aniwatch://'],
  config: {
    screens: {
      [RoutesNames.Browse]: 'browse',
      [RoutesNames.Series]: 'browse/:title',
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
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
