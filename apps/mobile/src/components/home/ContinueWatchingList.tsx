import React from 'react';

import { IContinueWatching } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { useQueryGetContinueWatching } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { RootStackScreenNames, SeriesStackScreenNames } from '../../routes';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';

export type ContinueWatchingListProps = Record<string, never>;

export const ContinueWatchingList: React.FC<
  ContinueWatchingListProps
> = ({}) => {
  const { data, refetch, isRefetching } = useQueryGetContinueWatching();
  const { translate } = useTranslate();
  const { navigate } = useNavigation<any>();

  return (
    <View>
      <Text>{translate('continue watching')}</Text>
      {data ? (
        <FlatList
          data={data}
          horizontal
          onRefresh={refetch}
          refreshing={isRefetching}
          renderItem={({ item }: { item: IContinueWatching }) => (
            <Pressable
              onPress={() =>
                navigate(RootStackScreenNames.SeriesStack, {
                  screen: SeriesStackScreenNames.Episodes,
                  params: {
                    seriesId: item.anime.id,
                  },
                })
              }
              style={styles.mainContainer}>
              <View>
                <View style={[styles.posterContainer]}>
                  <ProgressiveImage
                    resizeMode="cover"
                    source={item.anime.poster}
                    style={styles.poster}
                  />
                </View>
                <ProgressBar
                  progress={item.episode.progress / (24 * 60)}
                  style={styles.progressBar}
                  theme={{
                    colors: {
                      primary: colors.accent.color,
                    },
                  }}
                />
              </View>
              <Text style={[fontStyles.normal, colors.textLight]}>
                Episode: {item.episode.number}
              </Text>
            </Pressable>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 100,
    height: 200,
    flexDirection: 'column',
    marginRight: 20,
  },
  posterContainer: {
    width: '100%',
    height: 160,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
  },
  progressBar: {
    zIndex: 1,
  },
});
