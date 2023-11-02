import React from 'react';

import { NavigationContainer, Theme } from '@react-navigation/native';

import { RootStack } from './main';

const linking = {
  prefixes: ['naikamu://'],
  config: {
    screens: {},
  },
};

function Routes({ theme }: { theme: Theme }) {
  return (
    <NavigationContainer linking={linking} theme={theme}>
      <RootStack />
    </NavigationContainer>
  );
}

export default Routes;
