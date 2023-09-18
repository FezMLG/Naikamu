import { useState } from 'react';

const errorResolver = (message: string): string => {
  switch (message) {
    case 'auth/invalid-email':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/requires-recent-login':
    case 'auth/email-already-in-use':
    case 'auth/passwords-do-not-match':
    case 'auth/weak-password': {
      message = message.replaceAll('-', '_');
      message = message.replace('auth/', '');
      console.log(message);

      return `auth.errors.${message}`;
    }
    default: {
      return 'auth.errors.unknown';
    }
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
