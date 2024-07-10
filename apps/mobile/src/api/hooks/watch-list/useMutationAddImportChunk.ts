import { useMutation } from '@tanstack/react-query';
import { chunk } from 'lodash';

import { useWatchListImportStore } from '../../../services';
import { logger } from '../../../utils';
import { apiClient } from '../../APIClient';

export const useMutationAddImportChunk = () => {
  const watchListImportStore = useWatchListImportStore(store => store);

  return useMutation({
    mutationFn: async () => {
      logger('useMutationAddImportChunk').info();

      const chunks = chunk(watchListImportStore.actions.getChunks(), 100);

      console.log(chunks.length, 'chunks');

      for (let index = 0; index < chunks.length; index++) {
        console.log('chunk', index);
        console.log('is last', index === chunks.length - 1);
        await apiClient.addWatchListImportChunk({
          isLast: index === chunks.length - 1,
          data: chunks[index],
        });
      }
    },
  });
};
