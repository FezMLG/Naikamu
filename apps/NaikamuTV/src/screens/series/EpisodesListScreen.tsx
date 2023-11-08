import React from 'react';

import { AnimeEpisode } from '@naikamu/shared';
import {
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';

import { useQuerySeriesEpisodes } from '../../api/hooks';
import { Episode, PageLayout } from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import { SeriesStackEpisodeScreenProps } from '../../routes';
import { useSelectedSeriesStore } from '../../services';
import { darkStyle, globalStyle } from '../../styles';

export function EpisodesListScreen({ route }: SeriesStackEpisodeScreenProps) {
  const series = useSelectedSeriesStore(store => store.series);

  const { translate } = useTranslate();
  const {
    data: episodes,
    isError,
    isLoading,
    refetch,
  } = useQuerySeriesEpisodes();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout.Loading isLoading={isLoading} />
      <PageLayout.Error isError={isError} refetch={refetch} />
      <ScrollView style={styles.scrollView}>
        <Image
          resizeMode="contain"
          source={require('../../assets/logo_docchi.png')}
          style={[styles.logo]}
        />
        {episodes
          ? episodes.episodes.map((episode: AnimeEpisode, index: number) => (
              <Episode
                episode={episode}
                isWatched={episode.isWatched}
                key={index}
              />
            ))
          : null}
        <Text style={[globalStyle.disclaimer, darkStyle.font]}>
          {translate('anime_episodes.disclaimer')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
  },
  logo: {
    marginTop: 10,
    height: 20,
    width: 75,
    opacity: 0.75,
  },
});
