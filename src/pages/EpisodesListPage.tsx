import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { RoutesNames } from '../routes/RoutesNames.enum';
import { useQuery } from '@tanstack/react-query';
import { getTitle } from '../api/rest/frixy/getTitle';
import { darkStyle } from '../styles/darkMode.style';
import CardShadow from '../components/CardShadow';

export interface IEpisode {
  id: string;
  title: string;
  description: string;
  number: number;
  banner: string;
  players: LinkElement[];
  added_at: string;
  last_edit: string;
  poster: string;
}

export interface LinkElement {
  name: string;
  link: string;
}

const { isTV } = Platform;
const Episode = ({
  num,
  navigation,
  episode,
}: {
  num: number;
  navigation: any;
  episode: IEpisode;
}) => (
  <CardShadow
    style={[isTV ? styles.episodeContainer : styles.episodeContainerMobile]}
    focus={false}>
    <View style={[styles.card, darkStyle.card]}>
      <Image style={styles.poster} source={{ uri: episode.poster }} />
      <Text
        accessible={false}
        numberOfLines={2}
        style={[styles.title, darkStyle.font]}>
        {num + ' ' + episode.title}
      </Text>
      <Text accessible={false} style={[styles.description, darkStyle.font]}>
        {episode.description}
      </Text>
    </View>
    <View style={styles.linksContainer}>
      <Text accessible={false} style={[styles.title, darkStyle.font]}>
        Available players:
      </Text>
      {episode.players.map((player: LinkElement, index: number) => {
        return (
          <Player
            key={index}
            navigation={navigation}
            player={player}
            title={episode.title}
          />
        );
      })}
    </View>
  </CardShadow>
);

const Player = ({
  navigation,
  player,
  title,
}: {
  navigation: any;
  player: LinkElement;
  title: string;
}) => {
  return (
    <Button
      onPress={() => {
        navigation.navigate(RoutesNames.Watch, {
          uri: player.link,
          title: title,
          player: player.name,
        });
      }}>
      {player.name}
    </Button>
  );
};

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
            return (
              <Episode
                key={index}
                num={index + 1}
                navigation={navigation}
                episode={episode}
              />
            );
          })}
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
  poster: {
    height: 300,
  },
  title: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    minHeight: 350,
    width: '100%',
    maxWidth: 550,
  },
  buttonLink: {
    minHeight: 50,
    borderColor: 'blue',
    borderWidth: 1,
  },
  episodeContainer: {
    flex: 1,
    maxWidth: 700,
    maxHeight: 550,
    flexDirection: 'row',
    marginVertical: 10,
  },
  episodeContainerMobile: {
    flex: 1,
    maxWidth: 700,
    maxHeight: 550,
    flexDirection: 'column',
    marginVertical: 10,
  },
  linksContainer: {
    width: '100%',
    maxWidth: 150,
  },
  description: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
    maxHeight: 100,
  },
});

export default EpisodesListPage;
