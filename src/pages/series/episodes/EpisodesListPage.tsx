import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text } from 'react-native-paper';

import { darkStyle } from '../../../styles/darkMode.style';
import { EpisodeMobile } from '../../../components/episode/Episode.mobile';
import { EpisodeTV } from '../../../components/episode/Episode.tv';
import { globalStyle } from '../../../styles/global.style';
import { APIClient } from '../../../api/APIClient';
import { EpisodesPageProps } from '../../../routes/interfaces';
import { AnimeEpisode } from '../../../interfaces';

const { isTV } = Platform;

const EpisodesListPage = ({ navigation, route }: EpisodesPageProps) => {
  const apiClient = new APIClient();
  const { isLoading, data } = useQuery(
    ['anime', route.params.title, 'episodes'],
    () =>
      apiClient.getEpisodes(
        route.params.title,
        route.params.numOfAiredEpisodes,
      ),
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView style={styles.scrollView}>
        {isLoading && <ActivityIndicator size="large" />}
        {data &&
          data.episodes.map((episode: AnimeEpisode, index: number) => {
            if (isTV) {
              return (
                <EpisodeTV
                  key={index}
                  num={index + 1}
                  navigation={navigation}
                  episode={episode}
                />
              );
            }
            return (
              <EpisodeMobile
                key={index}
                num={index + 1}
                navigation={navigation}
                episode={episode}
              />
            );
          })}
        <Text
          variant="bodySmall"
          style={[globalStyle.disclaimer, darkStyle.font]}>
          AniWatch does not host any files on its own servers, we only provide
          links to content hosted on third-party servers.
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

export default EpisodesListPage;
