import { Platform, StyleSheet } from 'react-native';
import { RoutesNames } from '../../routes/RoutesNames.enum';
import { darkColor } from '../../styles/darkMode.style';
import { LinkElement } from './interfaces';

export const navigateToPlayer = ({
  navigation,
  player,
  title,
}: {
  navigation: any;
  player: LinkElement;
  title: string;
}) => {
  const { isTV } = Platform;
  const name = player.name
    .replace(/[\u0250-\ue007]/g, '')
    .replace(/\s/g, '')
    .toLowerCase();

  switch (name) {
    case 'cda':
      return navigation.navigate(RoutesNames.WatchNative, {
        uri: player.link,
        title: title,
        player: name,
      });

    default:
      if (isTV) {
        return navigation.navigate(RoutesNames.WatchError, {
          playerName: name,
        });
      }
      return navigation.navigate(RoutesNames.WatchWebView, {
        uri: player.link,
      });
  }
};

export const mainEpisodeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    height: 300,
  },
  title: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  card: {
    minHeight: 350,
    maxWidth: '100%',
    width: 550,
  },
  episodeContainer: {
    flex: 1,
    maxWidth: 700,
    maxHeight: 550,
    flexDirection: 'row',
    marginVertical: 10,
  },
  linksContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 150,
    backgroundColor: darkColor.C800,
  },
  description: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
    maxHeight: 100,
  },
});
