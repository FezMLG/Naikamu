import { useQuery } from '@tanstack/react-query';

import { useSelectedSeriesStore } from '../../../services';
import { APIClient } from '../../APIClient';

export const useQuerySeriesEpisodes = () => {
  const apiClient = new APIClient();
  const state = useSelectedSeriesStore(store => store.details);
  const actions = useSelectedSeriesStore(store => store.actions);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['anime', state?.id, 'episodes'],
    queryFn: async () => {
      const response = await apiClient.getEpisodes(
        state!.id,
        state!.nextAiringEpisode?.episode
          ? state!.nextAiringEpisode?.episode - 1
          : state!.episodes ?? 12,
      );

      actions.setEpisodes(response.episodes);

      return response;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
