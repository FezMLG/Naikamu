import React from 'react';

import {
  DarkTheme as NavigationDarkTheme,
  Theme,
} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import QueryClientWrap from './api/QueryClientWrap';
import LanguagesProvider from './i18n/LanguagesProvider';
import Routes from './routes/Routes';
import { colors } from './styles';

Sentry.init({
  dsn: 'https://84335994fbbcda63bb3322b389fc789c@o4506020904697856.ingest.sentry.io/4506684700164096',
});

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
