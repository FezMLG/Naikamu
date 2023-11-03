import React from 'react';

import {
  DarkTheme as NavigationDarkTheme,
  Theme,
} from '@react-navigation/native';

import QueryClientWrap from './api/QueryClientWrap';
import LanguagesProvider from './i18n/LanguagesProvider';
import Routes from './routes/Routes';
import { colors } from './styles';

const CombinedDarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: colors.background.color,
    primary: colors.accent.color,
  },
};

function App(): JSX.Element {
  return (
    <QueryClientWrap>
      <LanguagesProvider>
        <Routes theme={CombinedDarkTheme} />
      </LanguagesProvider>
    </QueryClientWrap>
  );
}

export default App;
