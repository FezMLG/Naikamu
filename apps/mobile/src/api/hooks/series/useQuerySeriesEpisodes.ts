import { useQuery } from '@tanstack/react-query';
import { APIClient } from '../../APIClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store/store';
import { Resolution } from '../../../services/store/reducers/interfaces';

export const useQuerySeriesEpisodes = (
  id: string,
  numOfAiredEpisodes: number,
) => {
  const apiClient = new APIClient();

  const { userSettings } = useSelector(
    (state: RootState) => state.userSettings,
  );

  const episodes = useQuery(['anime', id, 'episodes'], () =>
    apiClient.getEpisodes(
      id,
      numOfAiredEpisodes,
      userSettings?.preferredResolution ?? Resolution['1080p'],
    ),
  );

  return {
    episodes,
  };
};
