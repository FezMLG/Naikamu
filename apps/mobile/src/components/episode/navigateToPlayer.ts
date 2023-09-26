import { IPlayerResponse, IResolvePlayerDto } from '@aniwatch/shared';
import { Linking } from 'react-native';

import { RootStackScreenNames } from '../../routes';

export const navigateToPlayer = ({
  navigation,
  episodeTitle,
  dto,
  response,
}: {
  navigation: any;
  episodeTitle: string;
  dto: IResolvePlayerDto;
  response: IPlayerResponse;
}): Promise<() => unknown> => {
  if (response.type === 'local') {
    return navigation.navigate(RootStackScreenNames.NativePlayer, {
      uri: response.uri,
      seriesId: dto.animeId,
      episodeTitle,
      episodeNumber: dto.episode,
    });
  }

  return Linking.openURL(response.uri);
};
