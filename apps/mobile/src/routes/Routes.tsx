import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useUserStore } from '../services/auth/user.store';
import { BrowseStackScreenNames, SeriesStackScreenNames } from './main';
import { AuthStack } from './auth';
import { SplashScreen } from '../screens';
import { RootStack } from './main/RootStack';

const linking = {
  prefixes: ['aniwatch://'],
  config: {
    screens: {
      [BrowseStackScreenNames.Browse]: 'browse',
      [SeriesStackScreenNames.Series]: 'browse/:id',
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
      {user && user?.emailVerified ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
