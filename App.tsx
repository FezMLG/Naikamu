import React from 'react';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import QueryClientWrap from './src/api/QueryClientWrap';
import Routes from './src/routes/Routes';
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import LanguagesProvider from './src/i18n/LanguagesProvider';

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
        <FlipperAsyncStorage />
        <LanguagesProvider>
          <Routes theme={CombinedDarkTheme} />
        </LanguagesProvider>
      </PaperProvider>
    </QueryClientWrap>
  );
};

export default App;
