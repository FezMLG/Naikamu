import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { darkStyle } from '../../styles/darkMode.style';
import { mainEpisodeStyles, navigateToPlayer } from './Episode';
import { IEpisode, LinkElement } from './interfaces';
import { List, Text } from 'react-native-paper';

export const EpisodeMobile = ({
  num,
  navigation,
  episode,
}: {
  num: number;
  navigation: any;
  episode: IEpisode;
}) => (
  <SafeAreaView style={[styles.episodeContainerMobile]}>
    <View style={[styles.card, darkStyle.card]}>
      <Image
        style={[styles.poster, styles.borderRadius]}
        source={{ uri: episode.poster }}
      />
      <Text
        variant="titleMedium"
        accessible={false}
        numberOfLines={2}
        style={[styles.title, darkStyle.font]}>
        {num + ' ' + episode.title}
      </Text>
      <Text
        variant="bodySmall"
        accessible={false}
        style={[styles.description, darkStyle.font]}>
        {episode.description}
      </Text>
      <List.Accordion
        title={`${episode.players.length} available ${
          episode.players.length === 1 ? 'player' : 'players'
        }`}
        left={props => <List.Icon {...props} icon="folder" />}>
        {episode.players.map((player: LinkElement, index: number) => {
          return (
            <List.Item
              key={index}
              title={player.name}
              onPress={() => {
                navigateToPlayer({
                  navigation: navigation,
                  player: player,
                  title: episode.title,
                });
              }}
            />
          );
        })}
      </List.Accordion>
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
    borderRadius: 5,
  },
});
