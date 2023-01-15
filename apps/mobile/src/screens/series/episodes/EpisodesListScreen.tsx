import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text } from 'react-native-paper';

import { AnimeEpisode } from '@aniwatch/shared';

import { darkStyle } from '../../../styles/darkMode.style';
import { EpisodeMobile } from '../../../components/episode/Episode.mobile';
import { globalStyle } from '../../../styles/global.style';
import { APIClient } from '../../../api/APIClient';
import { useTranslate } from '../../../i18n/useTranslate';
import { EpisodesScreenProps } from '../../../routes/main';

const EpisodesListScreen = ({ route }: EpisodesScreenProps) => {
  const apiClient = new APIClient();
  const { translate } = useTranslate();

  const { isLoading, data, isError } = useQuery(
    ['anime', route.params.id, 'episodes'],
    () =>
      apiClient.getEpisodes(route.params.id, route.params.numOfAiredEpisodes),
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView style={styles.scrollView}>
        {isLoading && <ActivityIndicator size="large" />}
        {isError && (
          <Text>{translate('anime_episodes.players_not_found')}</Text>
        )}
        {data &&
          data.episodes.map((episode: AnimeEpisode, index: number) => {
            return (
              <EpisodeMobile
                key={index}
                num={index + 1}
                episode={episode}
                posterUrl={route.params.posterUrl}
                id={route.params.id}
                animeName={route.params.title}
              />
            );
          })}
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
    marginHorizontal: 20,
  },
});

export default EpisodesListScreen;
