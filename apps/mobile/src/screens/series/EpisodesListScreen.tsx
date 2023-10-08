import React from 'react';

import { AnimeEpisode } from '@naikamu/shared';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import { useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode, PageLayout, useLayout } from '../../components';
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

  return (
    <PageLayout.Default margin={false} {...layout}>
      <PageLayout.Loading isLoading={isLoading} />
      <PageLayout.Error isError={isError} refetch={refetch} />
      <ScrollView style={styles.scrollView}>
        {episodes
          ? episodes.episodes.map((episode: AnimeEpisode, index: number) => (
              <Episode
                episode={episode}
                isWatched={episode.isWatched}
                key={index}
              />
            ))
          : null}
        <Text
          style={[globalStyle.disclaimer, darkStyle.font]}
          variant="bodySmall">
          {translate('anime_episodes.disclaimer')}
        </Text>
      </ScrollView>
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
  },
});
