import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { WatchStatus } from '@aniwatch/shared';
import { ENV } from '@env';

import { useMutationUpdateUserWatchList } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles } from '../../styles';

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
    <View style={styles.container}>
      {mutation.isLoading ? (
        <ActivityIndicator size={'small'} style={styles.pad} />
      ) : (
        <>
          {ENV !== 'prod' && mutation.isError ? (
            <Text>{'An error occurred ' + mutation.error}</Text>
          ) : null}
          <Pressable
            style={styles.statusInfo}
            onPress={() => {
              mutation.mutate();
            }}>
            {watching === WatchStatus.Following ? (
              <>
                <Icon
                  name={'movie-open-check'}
                  size={30}
                  color={colors.textLight.color}
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
            ) : (
              <>
                <Icon
                  name={'movie-open-plus'}
                  size={30}
                  color={colors.textLight.color}
                />
                <Text style={[fontStyles.text, colors.textLight]}>
                  {translate('watch_list.add')}
                </Text>
              </>
            )}
          </Pressable>
        </>
      )}
    </View>
  );
};

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
