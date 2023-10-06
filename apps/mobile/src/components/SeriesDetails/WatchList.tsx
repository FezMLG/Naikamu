import React from 'react';

import { WatchStatus } from '@naikamu/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMutationUpdateUserWatchList } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles } from '../../styles';
import { ActivityIndicator } from '../atoms';

interface WatchListProps {
  seriesId: string;
  watchStatus: WatchStatus;
}

export function WatchList({ seriesId, watchStatus }: WatchListProps) {
  const { translate } = useTranslate();
  const { watching, mutation } = useMutationUpdateUserWatchList(
    watchStatus,
    seriesId,
  );

  const watchIconRender = (status: WatchStatus) => {
    switch (status) {
      case WatchStatus.Following: {
        return (
          <>
            <Icon
              color={colors.textLight.color}
              name="movie-open-star"
              size={30}
            />
            <Text
              style={[
                fontStyles.text,
                colors.textLight,
                { fontFamily: 'Roboto-Bold' },
              ]}>
              {translate('watch_list.watching')}
            </Text>
          </>
        );
      }

      case WatchStatus.Finished: {
        return (
          <>
            <Icon
              color={colors.textLight.color}
              name="movie-open-check"
              size={30}
            />
            <Text style={[fontStyles.text, colors.textLight]}>
              {translate('watch_list.finished')}
            </Text>
          </>
        );
      }

      default: {
        return (
          <>
            <Icon
              color={colors.textLight.color}
              name="movie-open-plus"
              size={30}
            />
            <Text style={[fontStyles.text, colors.textLight]}>
              {translate('watch_list.add')}
            </Text>
          </>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {mutation.isLoading ? (
        <ActivityIndicator
          size="large"
          style={styles.pad}
          visible={mutation.isLoading}
        />
      ) : (
        <>
          {Config.ENV !== 'production' && mutation.isError ? (
            <Text>{'An error occurred ' + mutation.error}</Text>
          ) : null}
          <Pressable
            onPress={() => {
              mutation.mutate();
            }}
            style={styles.statusInfo}>
            {watchIconRender(watching)}
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  pad: {
    paddingHorizontal: 10,
  },
  statusInfo: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
  },
});
