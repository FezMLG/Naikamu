import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
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

  return (
    <View style={styles.center}>
      {mutation.isLoading ? (
        <ActivityIndicator size={'small'} style={styles.pad} />
      ) : (
        <>
          {ENV !== 'prod' && mutation.isError ? (
            <Text>{'An error occurred ' + mutation.error}</Text>
          ) : null}
          <Button
            onPress={() => {
              mutation.mutate();
            }}>
            {watching === WatchStatus.Following ? (
              <Text>Remove from watchlist</Text>
            ) : (
              <Text>Add to watchlist</Text>
            )}
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  pad: {
    paddingHorizontal: 10,
  },
});
