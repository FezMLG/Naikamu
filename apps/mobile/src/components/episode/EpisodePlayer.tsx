import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { AnimePlayer } from '@aniwatch/shared';

import { darkColor } from '../../styles';
import { PlayerMenu } from './PlayerMenu';
import { navigateToPlayer } from './navigateToPlayer';
import { RootStackParamList } from '../../routes/main';

export const EpisodePlayer = ({
  animeName,
  episodeTitle,
  player,
  episodeNumber,
  isDownloaded,
  handleDownload,
}: {
  animeName: string;
  episodeTitle: string;
  player: AnimePlayer;
  episodeNumber: number;
  isDownloaded: boolean;
  handleDownload: (player: AnimePlayer) => void;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={styles.playersListItem}
      onPress={() => {
        navigateToPlayer({
          navigation: navigation,
          player: player,
          episodeTitle: episodeTitle,
          animeTitle: animeName,
          episodeNumber,
        });
      }}>
      <View style={styles.rowCenter}>
        {player.player_name.toLocaleLowerCase() === 'cda' ? (
          <Icon size={24} name={'play'} style={{ marginHorizontal: 10 }} />
        ) : (
          <Icon
            size={24}
            name={'open-in-new'}
            style={{ marginHorizontal: 10 }}
          />
        )}
        <Text>
          {player.translator_name +
            ' - ' +
            player.player_name.toLocaleLowerCase()}
        </Text>
      </View>
      <View style={styles.rowCenter}>
        <Image
          resizeMode="contain"
          style={[styles.logo, { maxWidth: 100 }]}
          source={require('../../../assets/logo_docchi.png')}
        />
        {isDownloaded ? null : (
          <Icon
            size={24}
            name={isDownloaded ? 'download-circle' : 'download-circle-outline'}
            style={{ paddingHorizontal: 10 }}
            onPress={() => handleDownload(player)}
          />
        )}
        <PlayerMenu player={player} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  playersListItem: {
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: darkColor.C700,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: 20,
    opacity: 0.75,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
