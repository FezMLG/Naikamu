import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { darkColor } from '../../styles/darkMode.style';
import {
  colors,
  defaultRadius,
  fontStyles,
  globalStyle,
} from '../../styles/global.style';
// import { useTranslate } from '../../i18n/useTranslate';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../routes/main';
import {
  IOfflineSeriesEpisodes,
  useOfflineService,
} from '../../services/offline';
import {
  createEpisodeProgressKey,
  useVideoProgress,
} from '../../services/useVideoProgress';
import { humanFileSize } from '../../utils/humanFileSize';
import { Swipeable } from 'react-native-gesture-handler';
import { Button, Modal } from '../atoms';

export const OfflineEpisode = ({
  episode,
  animeId,
  animeName,
}: {
  episode: IOfflineSeriesEpisodes;
  animeId: string;
  animeName: string;
}) => {
  const navigation = useNavigation<any>();
  const episodeKey = createEpisodeProgressKey(animeId, episode.number);
  const { progressMinutes, loadProgress } = useVideoProgress(episodeKey);
  const { deleteEpisodeOffline } = useOfflineService();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // const { translate } = useTranslate();

  const RightSwipeActions = () => {
    return (
      <Pressable
        style={{
          backgroundColor: colors.error.color,
          justifyContent: 'center',
          alignItems: 'flex-end',
          borderRadius: defaultRadius,
          width: '100%',
        }}
        onPress={() => {
          console.log('delete episode', animeId, episode.number);
          deleteEpisodeOffline(animeId, episode.number);
        }}>
        <Icon
          name={'trash-can-outline'}
          size={30}
          color={colors.textLight.color}
          style={{ paddingHorizontal: 16 }}
        />
      </Pressable>
    );
  };

  return (
    <>
      <Modal.Container setIsOpen={setIsOpen} isOpen={isOpen}>
        <Modal.Title title={episode.title} />
        <Button
          label={'Delete'}
          type="warning"
          onPress={() => {
            console.log('delete episode', animeId, episode.number);
            deleteEpisodeOffline(animeId, episode.number);
            setIsOpen(false);
          }}
        />
      </Modal.Container>
      <Swipeable
        renderRightActions={RightSwipeActions}
        containerStyle={globalStyle.spacerSmall}>
        <Pressable
          style={[
            styles.cardContainer,
            !progressMinutes
              ? {
                  borderBottomLeftRadius: defaultRadius,
                  borderBottomRightRadius: defaultRadius,
                }
              : null,
          ]}
          onLongPress={() => setIsOpen(true)}>
          <View style={[styles.innerCard]}>
            <Pressable
              style={styles.watchStatus}
              onPress={() =>
                navigation.navigate(ScreenNames.WatchNative, {
                  uri: episode.pathToFile,
                  episodeTitle: episode.title,
                  episodeNumber: episode.number,
                  title: animeName,
                })
              }>
              <Icon name={'play'} size={30} color={colors.textLight.color} />
            </Pressable>
            <View style={styles.titleRow}>
              <Text numberOfLines={2} style={[styles.title, colors.textLight]}>
                {episode.number + '. ' + episode.title}
              </Text>
              <Text
                numberOfLines={2}
                style={[fontStyles.label, colors.textLight]}>
                {episode.length} min | {episode.translator} |{' '}
                {humanFileSize(episode.size ?? 0)}
              </Text>
            </View>
          </View>
          <ProgressBar
            progress={progressMinutes / episode.length}
            theme={{
              colors: {
                primary: colors.accent.color,
              },
            }}
          />
        </Pressable>
      </Swipeable>
    </>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: 110,
    height: 80,
    borderTopLeftRadius: defaultRadius,
  },
  titleRow: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  watchStatus: {
    padding: 10,
    alignItems: 'center',
    width: 70,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  innerCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: darkColor.C800,
    backgroundColor: darkColor.C900,
  },
  linksContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 150,
    backgroundColor: darkColor.C800,
  },
  description: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  playersList: {
    marginTop: 10,
    backgroundColor: darkColor.C900,
    borderRadius: defaultRadius,
  },
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
  playersListContainer: {
    backgroundColor: darkColor.C800,
    borderRadius: defaultRadius,
    maxWidth: '100%',
  },
  playersLoading: {
    height: 70,
    width: '85%',
  },
  logo: {
    height: 20,
    opacity: 0.75,
  },
});
