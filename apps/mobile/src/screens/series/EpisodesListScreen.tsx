import React from 'react';

import { AnimeEpisode } from '@aniwatch/shared';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';

import { useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesStackEpisodeScreenProps } from '../../routes';
import { darkStyle, globalStyle } from '../../styles';

export function EpisodesListScreen({ route }: SeriesStackEpisodeScreenProps) {
  const { translate } = useTranslate();
  const { episodes } = useQuerySeriesEpisodes(
    route.params.id,
    route.params.numOfAiredEpisodes,
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView style={styles.scrollView}>
        {episodes.isLoading && <ActivityIndicator size="large" />}
        {episodes.isError && (
          <Text>{translate('anime_episodes.players_not_found')}</Text>
        )}
        {episodes.data
          ? episodes.data.episodes.map(
              (episode: AnimeEpisode, index: number) => (
                <Episode
                  animeName={route.params.title}
                  episode={episode}
                  episodeLength={route.params.episodeLength}
                  id={route.params.id}
                  isWatched={episode.isWatched}
                  key={index}
                  posterUrl={route.params.posterUrl}
                />
              ),
            )
          : null}
        <Text
          style={[globalStyle.disclaimer, darkStyle.font]}
          variant="bodySmall">
          {translate('anime_episodes.disclaimer')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 10,
  },
});
