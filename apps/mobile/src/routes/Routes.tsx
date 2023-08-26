import React from 'react';

import { NavigationContainer, Theme } from '@react-navigation/native';

import { SplashScreen } from '../screens';
import { useUserStore } from '../services/auth/user.store';

import { AuthStack } from './auth';
import {
  BrowseStackScreenNames,
  SeriesStackScreenNames,
  RootStack,
} from './main';

const linking = {
  prefixes: ['aniwatch://'],
  config: {
    screens: {
      [BrowseStackScreenNames.Browse]: 'browse',
      [SeriesStackScreenNames.Series]: 'browse/:id',
    },
  },
};

function Routes({ theme }: { theme: Theme }) {
  const user = useUserStore(state => state.user);

  return (
    <NavigationContainer
      fallback={<SplashScreen />}
      linking={linking}
      theme={theme}>
      {user && user?.emailVerified ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Routes;
