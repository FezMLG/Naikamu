import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

import { AnimeEpisode } from '@aniwatch/shared';

import { darkStyle } from '../../../styles/darkMode.style';
import { Episode } from '../../../components/episode/Episode';
import { globalStyle } from '../../../styles/global.style';
import { useTranslate } from '../../../i18n/useTranslate';
import { EpisodesScreenProps } from '../../../routes/main';
import { useQuerySeriesEpisodes } from '../../../api/hooks';

const EpisodesListScreen = ({ route }: EpisodesScreenProps) => {
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
              (episode: AnimeEpisode, index: number) => {
                return (
                  <Episode
                    key={index}
                    episode={episode}
                    posterUrl={route.params.posterUrl}
                    id={route.params.id}
                    animeName={route.params.title}
                    isWatched={episode.isWatched}
                    episodeLength={route.params.episodeLength}
                  />
                );
              },
            )
          : null}
        <Text
          variant="bodySmall"
          style={[globalStyle.disclaimer, darkStyle.font]}>
          {translate('anime_episodes.disclaimer')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 10,
  },
});

export default EpisodesListScreen;
