import { useQuery } from '@tanstack/react-query';

export const useQueryApiHealth = (
  queryFunction: () => Promise<{
    status: number;
    message: string;
    version: string;
  }>,
) => {
  const { data, isError, error, refetch } = useQuery({
    queryKey: ['api', 'health', new Date().toTimeString()],
    queryFn: () => queryFunction,
    enabled: false,
  });

  return {
    data,
    isError,
    error,
    refetch,
  };
};
