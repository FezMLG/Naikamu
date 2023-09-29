import { IPlayerResponse } from '@aniwatch/shared';
import { Linking } from 'react-native';

import { RootStackScreenNames } from '../../routes';

export const navigateToPlayer = ({
  navigation,
  episodeTitle,
  seriesId,
  response,
  episodeNumber,
}: {
  navigation: any;
  seriesId: string;
  episodeTitle: string;
  response: IPlayerResponse;
  episodeNumber: number;
}): Promise<() => unknown> => {
  if (response.type === 'local') {
    return navigation.navigate(RootStackScreenNames.NativePlayer, {
      uri: response.uri,
      seriesId,
      episodeTitle,
      episodeNumber,
    });
  }

  return Linking.openURL(response.uri);
};
