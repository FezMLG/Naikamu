import React, { useState } from 'react';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { addBreadcrumb, reportError } from '../utils';

const handleError = (source: string, error: unknown) => {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    addBreadcrumb(`[QUERY] ${source} ${status ?? error.code}`);

    // Offline or timed out, nothing actionable on our side
    if (!status || status === 401 || status === 403) {
      return;
    }
  } else {
    addBreadcrumb(`[QUERY] ${source}`);
  }

  reportError(error);
};

function QueryClientWrap(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) =>
            handleError(JSON.stringify(query.queryKey), error),
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) =>
            handleError(
              JSON.stringify(mutation.options.mutationKey ?? 'mutation'),
              error,
            ),
        }),
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) =>
              !(error?.response?.status === 502 && failureCount > 3),
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}

export default QueryClientWrap;
