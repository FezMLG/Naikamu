import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import CardShadow from '../../../components/CardShadow';
import { darkStyle, darkColor } from '../../../styles/darkMode.style';
import { mainEpisodeStyles } from './Episode';
import { IEpisode, LinkElement } from './interfaces';
import { Source } from './Source';

export const EpisodeMobile = ({
  num,
  navigation,
  episode,
}: {
  num: number;
  navigation: any;
  episode: IEpisode;
}) => (
  <CardShadow style={[styles.episodeContainerMobile]} focus={false}>
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
    <View style={styles.linksContainerMobile}>
      <Text accessible={false} style={[styles.title, darkStyle.font]}>
        Available players:
      </Text>
      <View style={styles.linksBoxMobile}>
        {episode.players.map((player: LinkElement, index: number) => {
          return (
            <Source
              key={index}
              navigation={navigation}
              player={player}
              title={episode.title}
            />
          );
        })}
      </View>
    </View>
  </CardShadow>
);

const styles = StyleSheet.create({
  ...mainEpisodeStyles,
  episodeContainerMobile: {
    flex: 1,
    width: '100%',
    maxHeight: 550,
    flexDirection: 'column',
    marginVertical: 10,
  },
  linksContainerMobile: {
    width: Dimensions.get('window').width,
    height: '100%',
    borderColor: 'blue',
    borderWidth: 1,
    backgroundColor: darkColor.C800,
    marginHorizontal: 10,
  },
  linksBoxMobile: {
    flexDirection: 'row',
  },
});
