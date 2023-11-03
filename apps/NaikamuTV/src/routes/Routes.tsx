import React from 'react';

import { NavigationContainer, Theme } from '@react-navigation/native';

import { SplashScreen } from '../screens';
import { useUserStore } from '../services';

import { AuthStack } from './auth';
import { RootStack } from './main';

const linking = {
  prefixes: ['naikamu://'],
  config: {
    screens: {},
  },
};

function Routes({ theme }: { theme: Theme }) {
  const user = useUserStore(state => state.user);

  return (
    <NavigationContainer
      fallback={<SplashScreen />}
      linking={linking}
      theme={theme}>
      {user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Routes;
