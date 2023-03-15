import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { WatchStatus } from '@aniwatch/shared';
import { ENV } from '@env';

import { useMutationUpdateUserWatchList } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';

interface WatchListProps {
  seriesId: string;
  watchStatus: WatchStatus;
}

export const WatchList = ({ seriesId, watchStatus }: WatchListProps) => {
  const { translate } = useTranslate();
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
              <View>
                <Icon name={'movie-open-check'} />
                <Text>Watching</Text>
              </View>
            ) : (
              <View>
                <Icon name={'movie-open-plus'} />
                <Text>Add to list</Text>
              </View>
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
