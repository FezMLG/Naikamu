import { useMutation } from '@tanstack/react-query';

import { apiClient } from '../../APIClient';

export const useMutationSaveShindenUserId = () => {
  const mutation = useMutation({
    mutationFn: (shindenUserId: string) =>
      apiClient.saveShindenUserId(shindenUserId),
  });

  return {
    mutation,
  };
};
