import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryClientWrap = (props: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default QueryClientWrap;
