import { useMutation } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useMutationSaveNotificationToken = () => {
  const apiClient = new APIClient();
  const mutation = useMutation({
    mutationFn: (token: string) => apiClient.saveNotificationToken(token),
  });

  return {
    mutation,
  };
};
