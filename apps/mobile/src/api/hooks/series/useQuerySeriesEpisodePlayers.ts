import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';
import { useUserSettingsService } from '../../../services/settings/settings.service';

export const useQuerySeriesEpisodePlayers = (id: string, num: number) => {
  const apiClient = new APIClient();

  const { userSettings } = useUserSettingsService();

  const { data, refetch } = useQuery(
    ['anime', id, 'episodes', num],
    () =>
      apiClient.getEpisodePlayers(id, num, userSettings.preferredResolution),
    {
      enabled: false,
    },
  );

  return {
    data,
    refetch,
  };
};
