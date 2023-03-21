import { Linking } from 'react-native';

import { ScreenNames } from '../../routes/main';
import { AnimePlayer } from '@aniwatch/shared';

export const navigateToPlayer = async ({
  navigation,
  player,
  episodeTitle,
  animeTitle,
  episodeNumber,
}: {
  navigation: any;
  player: AnimePlayer;
  episodeTitle: string;
  animeTitle: string;
  episodeNumber: number;
}) => {
  const name = player.player_name
    .replace(/[\u0250-\ue007]/g, '')
    .replace(/\s/g, '')
    .toLowerCase();

  switch (name) {
    case 'cda':
      return navigation.navigate(ScreenNames.WatchNative, {
        uri: player.player_link,
        title: animeTitle,
        episodeTitle,
        player: name,
        episodeNumber,
      });

    case 'pobierz':
      await Linking.canOpenURL(player.player_link);
      return Linking.openURL(player.player_link);

    default:
      return navigation.navigate(ScreenNames.WatchWebView, {
        uri: player.player_link,
      });
  }
};
