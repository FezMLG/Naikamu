import React from 'react';
import GraphQLClient from './src/api/graphql/GraphQLClient';
import QueryClientWrap from './src/api/rest/QueryClientWrap';
import Routes from './src/routes/Routes';

const App = () => {
  return (
    <QueryClientWrap>
      <GraphQLClient>
        <Routes />
      </GraphQLClient>
    </QueryClientWrap>
  );
};

export default App;
