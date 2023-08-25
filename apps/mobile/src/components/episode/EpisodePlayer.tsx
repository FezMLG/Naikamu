import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { AnimePlayer } from '@aniwatch/shared';

import { colors, darkColor } from '../../styles';
import { PlayerMenu } from './PlayerMenu';
import { navigateToPlayer } from './navigateToPlayer';
import { BrowseStackParamList } from '../../routes';

export const EpisodePlayer = ({
  seriesId,
  episodeTitle,
  player,
  episodeNumber,
  isDownloaded,
  handleDownload,
}: {
  seriesId: string;
  episodeTitle: string;
  player: AnimePlayer;
  episodeNumber: number;
  isDownloaded: boolean;
  handleDownload: (player: AnimePlayer) => void;
}) => {
  const navigation = useNavigation<NavigationProp<BrowseStackParamList>>();

  return (
    <Pressable
      style={[
        styles.playersListItem,
        player.player_name.toLocaleLowerCase() !== 'cda'
          ? { height: 50 }
          : { borderColor: colors.accent.color },
      ]}
      onPress={() => {
        navigateToPlayer({
          navigation: navigation,
          player: player,
          episodeTitle: episodeTitle,
          episodeNumber,
          seriesId,
        });
      }}>
      <View style={styles.rowCenter}>
        {player.player_name.toLocaleLowerCase() === 'cda' ? (
          <Icon
            size={24}
            name={'play'}
            style={[{ marginHorizontal: 10 }, colors.textLight]}
          />
        ) : (
          <Icon
            size={24}
            name={'open-in-new'}
            style={[{ marginHorizontal: 10 }, colors.textLight]}
          />
        )}
        <Text style={[colors.textLight]}>
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
        {player.player_name.toLocaleLowerCase() !== 'cda' ? null : (
          <>
            {isDownloaded ? null : (
              <Icon
                size={24}
                name={
                  isDownloaded ? 'download-circle' : 'download-circle-outline'
                }
                style={[{ paddingHorizontal: 10 }, colors.textLight]}
                onPress={() => handleDownload(player)}
              />
            )}
          </>
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
    borderColor: darkColor.C800,
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
