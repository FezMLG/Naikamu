import React from 'react';
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import QueryClientWrap from './api/QueryClientWrap';
import Routes from './routes/Routes';
import LanguagesProvider from './i18n/LanguagesProvider';

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: { ...NavigationDarkTheme.colors, ...PaperDarkTheme.colors },
};

const App = () => {
  return (
    <QueryClientWrap>
      <PaperProvider
        settings={{
          icon: props => <Icon {...props} />,
        }}
        theme={CombinedDarkTheme}>
        <LanguagesProvider>
          <Routes theme={CombinedDarkTheme} />
        </LanguagesProvider>
      </PaperProvider>
    </QueryClientWrap>
  );
};

export default App;
