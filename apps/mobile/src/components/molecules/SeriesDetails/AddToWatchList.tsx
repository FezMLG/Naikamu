import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

import { WatchStatus } from '@aniwatch/shared';
import { ENV } from '@env';

import { useMutationUpdateUserWatchList } from '../../../api/hooks';

interface AddToWatchListProps {
  seriesId: string;
  watchStatus: WatchStatus;
}

export const AddToWatchList = ({
  seriesId,
  watchStatus,
}: AddToWatchListProps) => {
  const { watching, mutation } = useMutationUpdateUserWatchList(
    watchStatus,
    seriesId,
  );

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
