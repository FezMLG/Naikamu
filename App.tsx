import React from 'react';
import QueryClientWrap from './src/api/QueryClientWrap';
import Routes from './src/routes/Routes';
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: { ...NavigationDarkTheme.colors, ...PaperDarkTheme.colors },
};

const App = () => {
  return (
    <QueryClientWrap>
      <PaperProvider theme={CombinedDarkTheme}>
        <Routes theme={CombinedDarkTheme} />
      </PaperProvider>
    </QueryClientWrap>
  );
};

export default App;
