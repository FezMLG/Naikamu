import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTitle } from '../../../api/rest/frixy/getTitle';
import { darkStyle } from '../../../styles/darkMode.style';
import { IEpisode } from '../../../components/episode/interfaces';
import { EpisodeMobile } from '../../../components/episode/Episode.mobile';
import { EpisodeTV } from '../../../components/episode/Episode.tv';
import { Text } from 'react-native-paper';
const { isTV } = Platform;

const EpisodesListPage = ({ navigation, route }: any) => {
  const { isLoading, data } = useQuery([route.params.title], () =>
    getTitle(route.params.title),
  );

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      <ScrollView style={styles.scrollView}>
        {isLoading && <ActivityIndicator size="large" />}
        {data &&
          data.episodes.map((episode: IEpisode, index: number) => {
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
        <Text variant="bodySmall" style={styles.disclaimer}>
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
  disclaimer: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default EpisodesListPage;
