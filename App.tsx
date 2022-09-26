import React from 'react';
import GraphQLClient from './src/api/graphql/GraphQLClient';
import QueryClientWrap from './src/api/rest/QueryClientWrap';
import Routes from './src/routes/Routes';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <QueryClientWrap>
      <GraphQLClient>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </GraphQLClient>
    </QueryClientWrap>
  );
};

export default App;
