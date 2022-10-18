import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { darkStyle } from '../../styles/darkMode.style';
import { mainEpisodeStyles } from './Episode';
import { defaultRadius } from '../../styles/global.style';
import { AnimeEpisode } from '../../interfaces';
import { RootStackParamList, RoutesNames } from '../../routes/interfaces';

export const EpisodeMobile = ({
  num,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  episode,
}: {
  num: number;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    RoutesNames.Episodes,
    undefined
  >;
  episode: AnimeEpisode;
}) => (
  <SafeAreaView style={[styles.episodeContainerMobile]}>
    <View style={[styles.card, darkStyle.card]}>
      <Image
        style={[styles.poster, styles.borderRadius]}
        source={{ uri: episode.poster_url ?? '' }}
      />
      <Text
        variant="titleLarge"
        accessible={false}
        numberOfLines={2}
        style={[styles.title, darkStyle.font]}>
        {num + ' ' + episode.title}
      </Text>
      <Text
        variant="bodyMedium"
        accessible={false}
        style={[styles.description, darkStyle.font]}>
        {episode.description}
      </Text>
      {
        // TODO change loading episodes behavior
        /* <List.Accordion
        title={`${episode.players.length} available ${
          episode.players.length === 1 ? 'player' : 'players'
        }`}
        left={props => <List.Icon {...props} icon="folder" />}>
        {episode.players.map((player: LinkElement, index: number) => {
          // TODO on long press user can choose if he want to open in webview or open external browser (mobile only)
          return (
            <List.Item
              key={index}
              title={player.name}
              onPress={async () => {
                await navigateToPlayer({
                  navigation: navigation,
                  player: player,
                  title: episode.title,
                });
              }}
              right={() => <PlayerMenu player={player} />}
            />
          );
        })}
      </List.Accordion> */
      }
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  ...mainEpisodeStyles,
  episodeContainerMobile: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginVertical: 10,
  },
  description: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  borderRadius: {
    borderRadius: defaultRadius,
  },
});
