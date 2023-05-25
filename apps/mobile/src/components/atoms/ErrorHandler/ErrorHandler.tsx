import { useState } from 'react';

const errorResolver = (message: string): string => {
  switch (message) {
    case 'auth/invalid-email':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/requires-recent-login':
      return `auth.errors.[${message}]`;
    default:
      return 'auth.errors.unknown';
  }
};

export const useErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return {
    errorMessage,
    setErrorMessage,
    errorResolver,
  };
};
