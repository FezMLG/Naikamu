import React from 'react';

import {
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { SplashScreen } from '../screens';
import { useUserStore } from '../services';
import { addBreadcrumb } from '../utils';

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
  const navigationRef =
    useNavigationContainerRef<Record<string, object | undefined>>();

  return (
    <NavigationContainer
      fallback={<SplashScreen />}
      linking={linking}
      onStateChange={() =>
        addBreadcrumb(`[NAV] ${navigationRef.getCurrentRoute()?.name}`)
      }
      ref={navigationRef}
      theme={theme}>
      {user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Routes;
