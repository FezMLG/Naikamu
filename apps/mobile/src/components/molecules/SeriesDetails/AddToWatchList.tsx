import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useMutation } from '@tanstack/react-query';

import { APIClient } from '../../../api/APIClient';
import { WatchStatus } from '../../../../../../lib/shared/dist';
import { ENV } from '@env';

interface AddToWatchListProps {
  seriesId: string;
  watchStatus: WatchStatus;
}

export const AddToWatchList = ({
  seriesId,
  watchStatus,
}: AddToWatchListProps) => {
  const apiClient = new APIClient();
  const [watching, setWatching] = useState<WatchStatus>(watchStatus);
  const mutation = useMutation({
    mutationFn: () => apiClient.addToUserSeriesWatchList(seriesId),
    onSuccess: data => {
      setWatching(data.status);
    },
  });

  //TODO
  return (
    <View>
      {mutation.isLoading ? (
        <Text>Adding to watchlist...</Text>
      ) : (
        <>
          {ENV !== 'prod' && mutation.isError ? (
            <Text>{'An error occurred ' + mutation.error}</Text>
          ) : null}

          {watching === WatchStatus.Following ? (
            <Button
              onPress={() => {
                mutation.mutate();
              }}>
              Remove from watchlist
            </Button>
          ) : (
            <Button
              onPress={() => {
                mutation.mutate();
              }}>
              Add to watchlist
            </Button>
          )}
        </>
      )}
    </View>
  );
};
