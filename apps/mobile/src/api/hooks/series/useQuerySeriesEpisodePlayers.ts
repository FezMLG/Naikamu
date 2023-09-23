import { useQuery } from '@tanstack/react-query';

import { useUserSettingsService } from '../../../services/settings/settings.service';
import { APIClient } from '../../APIClient';

export const useQuerySeriesEpisodePlayers = (id: string, number_: number) => {
  const apiClient = new APIClient();

  const { userSettings } = useUserSettingsService();

  const { data, refetch, isError, isLoading } = useQuery(
    ['anime', id, 'episodes', number_],
    () =>
      apiClient.getEpisodePlayers(
        id,
        number_,
        userSettings.preferredResolution,
      ),
    {
      enabled: false,
    },
  );

  return {
    data,
    refetch,
    isError,
    isLoading,
  };
};
