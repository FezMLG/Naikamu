import React from 'react';
import GraphQLClient from './src/api/graphql/GraphQLClient';
import QueryClientWrap from './src/api/rest/QueryClientWrap';
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
      <GraphQLClient>
        <PaperProvider theme={CombinedDarkTheme}>
          <Routes theme={CombinedDarkTheme} />
        </PaperProvider>
      </GraphQLClient>
    </QueryClientWrap>
  );
};

export default App;
