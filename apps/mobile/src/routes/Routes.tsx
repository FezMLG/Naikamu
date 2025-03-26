import React, { useRef } from 'react';

import analytics from '@react-native-firebase/analytics';
import { NavigationContainer, Theme } from '@react-navigation/native';

import { SplashScreen } from '../screens';
import { useUserStore } from '../services/auth/user.store';

import { AuthStack, AuthStackRoutesNames } from './auth';
import {
  BrowseStackScreenNames,
  SeriesStackScreenNames,
  RootStack,
} from './main';

const linking = {
  prefixes: ['naikamu://'],
  config: {
    screens: {
      [AuthStackRoutesNames.Login]: 'login',
      [BrowseStackScreenNames.Browse]: 'browse',
      [SeriesStackScreenNames.Series]: 'browse/:id',
    },
  },
};

function Routes({ theme }: { theme: Theme }) {
  const routeNameRef = useRef<string>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigationRef = useRef<any>(null);
  const user = useUserStore(state => state.user);

  return (
    <NavigationContainer
      fallback={<SplashScreen />}
      linking={linking}
      navigationInChildEnabled={true}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
      ref={navigationRef}
      theme={theme}>
      {user && user.emailVerified ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Routes;
