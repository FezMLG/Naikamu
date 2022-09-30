import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const cache = new InMemoryCache({});

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: cache,
});

const GraphQLClient = (props: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);

export default GraphQLClient;
