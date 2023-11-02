/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  DarkTheme as NavigationDarkTheme,
  Theme,
} from '@react-navigation/native';

import LanguagesProvider from './i18n/LanguagesProvider';
import Routes from './routes/Routes';
import { colors } from './styles';

const CombinedDarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: colors.accent.color,
  },
};

function App(): JSX.Element {
  return (
    <LanguagesProvider>
      <Routes theme={CombinedDarkTheme} />
    </LanguagesProvider>
  );
}

export default App;
