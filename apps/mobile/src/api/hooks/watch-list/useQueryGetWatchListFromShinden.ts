import { User } from '@naikamu/shared';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useWatchListImportStore } from '../../../services';
import { getRandomUserAgent } from '../../../services/user-agents';
import {
  ShindenItem,
  ShindenResponse,
} from '../../../services/watch-list/shinden';

export const useQueryGetWatchListFromShinden = ({ user }: { user?: User }) => {
  const watchListImportStore = useWatchListImportStore(store => store);

  const query = useQuery({
    queryKey: ['watch-list-import-chunks'],
    queryFn: async () => {
      console.log('user', user);
      watchListImportStore.actions.clearChunks();
      if (!user || !user.shindenUserId) {
        return;
      }

      const limit = 100;
      let offset = 0;
      let count = 0;

      do {
        const { data } = await axios.get<ShindenResponse>(
          `https://lista.shinden.pl/api/userlist/${user.shindenUserId}/anime?limit=${limit}&offset=${offset}`,
          {
            headers: {
              'User-Agent': getRandomUserAgent(),
            },
          },
        );

        console.log('data', data.result.count, data.result.items.length);

        count = data.result.count;

        offset += limit;

        watchListImportStore.actions.addChunks(
          data.result.items.map((item: ShindenItem) => ({
            providerId: item.titleId.toString(),
            title: item.title,
            status: item.watchStatus,
            watchedEpisodesCount:
              Number.parseInt(item.watchedEpisodesCnt, 10) ?? 0,
          })),
        );

        console.log('chunks', watchListImportStore.actions.getChunks().length);
        console.log('offset', offset, count);
      } while (offset < count);
      console.log('done');
    },
    enabled: false,
  });

  return {
    ...query,
    isLoading: query.isLoading && query.fetchStatus !== 'idle',
  };
};
