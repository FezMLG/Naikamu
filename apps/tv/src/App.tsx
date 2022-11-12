import React from 'react';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import { Provider as ReduxProvider } from 'react-redux';
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import QueryClientWrap from './api/QueryClientWrap';
import Routes from './routes/Routes';
import LanguagesProvider from './i18n/LanguagesProvider';
import { store } from './services/store/store';

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
        <ReduxProvider store={store}>
          <LanguagesProvider>
            <Routes theme={CombinedDarkTheme} />
          </LanguagesProvider>
        </ReduxProvider>
      </PaperProvider>
    </QueryClientWrap>
  );
};

export default App;
