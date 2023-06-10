import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';

export const useQueryApiHealth = () => {
  const apiClient = new APIClient();

  const { data, isError, error } = useQuery(
    ['api', 'health', new Date().toTimeString()],
    () => apiClient.getApiHealth(),
  );

  return {
    data,
    isError,
    error,
  };
};

export const useQueryApiVersion = () => {
  const apiClient = new APIClient();

  const { data, isError, error } = useQuery(
    ['api', 'version', new Date().toTimeString()],
    () => apiClient.getApiVersion(),
  );

  return {
    data,
    isError,
    error,
  };
};
