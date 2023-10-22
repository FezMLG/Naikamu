import React from 'react';

import {NavigationContainer, Theme} from '@react-navigation/native';

const linking = {
  prefixes: ['naikamu://'],
  config: {
    screens: {},
  },
};

function Routes({theme}: {theme: Theme}) {
  return (
    <NavigationContainer linking={linking} theme={theme}>
      <></>
    </NavigationContainer>
  );
}

export default Routes;
