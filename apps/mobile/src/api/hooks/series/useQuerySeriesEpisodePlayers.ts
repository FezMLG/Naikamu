import { useQuery } from '@tanstack/react-query';

import { APIClient } from '../../APIClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/redux/store';
import { Resolution } from '../../../services/redux/reducers/interfaces';

export const useQuerySeriesEpisodePlayers = (id: string, num: number) => {
  const apiClient = new APIClient();

  const { userSettings } = useSelector(
    (state: RootState) => state.userSettings,
  );

  const { data, refetch } = useQuery(
    ['anime', id, 'episodes', num],
    () =>
      apiClient.getEpisodePlayers(
        id,
        num,
        userSettings?.preferredResolution ?? Resolution['1080p'],
      ),
    {
      enabled: false,
    },
  );

  return {
    data,
    refetch,
  };
};
