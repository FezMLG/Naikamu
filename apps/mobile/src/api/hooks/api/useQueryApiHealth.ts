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

  const { data, isError, error, refetch } = useQuery({
    queryKey: ['api', 'health', new Date().toTimeString()],
    queryFn: () => apiClient.getApiHealth(),
    onSuccess,
    enabled: false,
  });

  return {
    data,
    isError,
    error,
    refetch,
  };
};
