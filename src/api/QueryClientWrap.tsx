import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QueryClientWrap = (props: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error: any) => {
              if (error?.response.status === 502 && failureCount > 3) {
                return false;
              }
              if (error?.response.status >= 400) {
                return false;
              }
              return true;
            },
          },
        },
      }),
  );
  // WARN  [AxiosError: Request failed with status code 403]
  //   FirebaseAuthError: Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.
  //     at FirebaseTokenVerifier.mapJwtErrorToAuthError (/Users/konrad/Documents/GitHub/ani-watch/ani-watch-backend/node_modules/.pnpm/firebase-admin@11.2.0/node_modules/firebase-admin/lib/auth/token-verifier.js:262:20)
  //     at /Users/konrad/Documents/GitHub/ani-watch/ani-watch-backend/node_modules/.pnpm/firebase-admin@11.2.0/node_modules/firebase-admin/lib/auth/token-verifier.js:246:24
  //     at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  //   errorInfo: {
  //     code: 'auth/id-token-expired',
  //     message: 'Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'
  //   },
  //   codePrefix: 'auth'
  // }

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default QueryClientWrap;
