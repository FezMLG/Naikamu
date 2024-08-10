import { useQuery } from '@tanstack/react-query';

import { checkForUpdates } from '../../../services';

export const useQueryGetAppUpdate = () =>
  useQuery({
    queryKey: ['app', 'update'],
    queryFn: async () => checkForUpdates(),
  });
