import { Linking } from 'react-native';

import { RootStackScreenNames } from '../../routes';
import { AnimePlayer } from '@aniwatch/shared';

export const navigateToPlayer = ({
  navigation,
  player,
  episodeTitle,
  episodeNumber,
  seriesId,
}: {
  navigation: any;
  player: AnimePlayer;
  episodeTitle: string;
  episodeNumber: number;
  seriesId: string;
}) => {
  const name = player.player_name
    .replace(/[\u0250-\ue007]/g, '')
    .replace(/\s/g, '')
    .toLowerCase();

  switch (name) {
    case 'cda':
      return navigation.navigate(RootStackScreenNames.NativePlayer, {
        uri: player.player_link,
        seriesId,
        episodeTitle,
        player: name,
        episodeNumber,
      });

    default:
      return Linking.openURL(player.player_link);
  }
};
