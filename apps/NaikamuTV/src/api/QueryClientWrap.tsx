import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function QueryClientWrap(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) =>
              !(error?.response.status === 502 && failureCount > 3),
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
