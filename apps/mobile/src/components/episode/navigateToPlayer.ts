import { AnimePlayer } from '@aniwatch/shared';
import { Linking } from 'react-native';

import { RootStackScreenNames } from '../../routes';

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
    .replaceAll(/[\u0250-\uE007]/g, '')
    .replaceAll(/\s/g, '')
    .toLowerCase();

  if (name === 'cda') {
    return navigation.navigate(RootStackScreenNames.NativePlayer, {
      uri: player.player_link,
      seriesId,
      episodeTitle,
      player: name,
      episodeNumber,
    });
  }

  return Linking.openURL(player.player_link);
};
