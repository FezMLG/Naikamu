import React from 'react';

import { AnimeEpisode } from '@naikamu/shared';
import { StyleSheet, Image, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

import { useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode, PageLayout, useLayout } from '../../components';
import { UpcomingEpisode } from '../../components/episode/UpcomingEpisode';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesStackEpisodeScreenProps } from '../../routes';
import { useActiveSeriesStore } from '../../services';
import { darkStyle, globalStyle } from '../../styles';

export function EpisodesListScreen({ route }: SeriesStackEpisodeScreenProps) {
  const series = useActiveSeriesStore(store => store.series);

  const { translate } = useTranslate();
  const layout = useLayout();
  const {
    data: episodes,
    isError,
    isLoading,
    refetch,
  } = useQuerySeriesEpisodes(route.params.seriesId, series.numOfAiredEpisodes);

  const renderItem = ({ item }: { item: AnimeEpisode }) => (
    <Episode episodeNumber={item.number} />
  );

  return (
    <PageLayout.Default margin={false} {...layout}>
      <PageLayout.Loading isLoading={isLoading} />
      <PageLayout.Error isError={isError} refetch={refetch} />
      {episodes ? (
        <FlatList
          ListFooterComponent={
            <>
              {series.nextAiringEpisode?.episode ? <UpcomingEpisode /> : null}
              <Text
                style={[globalStyle.disclaimer, darkStyle.font]}
                variant="bodySmall">
                {translate('anime_episodes.disclaimer')}
              </Text>
            </>
          }
          ListHeaderComponent={
            <Image
              resizeMode="contain"
              source={require('../../../assets/logo_docchi.png')}
              style={[styles.logo]}
            />
          }
          contentContainerStyle={[styles.flatListContent]}
          contentInsetAdjustmentBehavior="automatic"
          data={episodes.episodes}
          keyExtractor={(_, index) => index.toString()}
          numColumns={1}
          onRefresh={refetch}
          refreshing={isLoading}
          renderItem={renderItem}
        />
      ) : null}
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 10,
    height: 20,
    width: 75,
    opacity: 0.75,
  },
  flatListContent: {
    flexGrow: 1,
    marginHorizontal: 10,
  },
});
