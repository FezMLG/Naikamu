import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQueryApiHealth = (
  onSuccess: (data: {
    status: number;
    message: string;
    version: string;
  }) => void,
) => {
  const apiClient = new APIClient();

  const { data, isError, error } = useQuery({
    queryKey: ['api', 'health', new Date().toTimeString()],
    queryFn: () => apiClient.getApiHealth(),
    onSuccess,
  });

  return {
    data,
    isError,
    error,
  };
};
