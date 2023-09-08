import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackScreenNames } from '../../routes';
import {
  IOfflineSeriesEpisodes,
  useOfflineService,
  createEpisodeProgressKey,
  useVideoProgress,
  offlineFS,
} from '../../services';
import {
  colors,
  defaultRadius,
  fontStyles,
  globalStyle,
  DarkColor,
} from '../../styles';
import { humanFileSize } from '../../utils/humanFileSize';
import { Button, Modal } from '../atoms';

export function OfflineEpisode({
  episode,
  animeId,
  animeName,
}: {
  episode: IOfflineSeriesEpisodes;
  animeId: string;
  animeName: string;
}): React.ReactElement {
  const navigation = useNavigation<any>();
  const episodeKey = createEpisodeProgressKey(animeId, episode.number);
  const { progressMinutes, loadProgress } = useVideoProgress(episodeKey);
  const { deleteEpisodeOffline } = useOfflineService();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // const { translate } = useTranslate();

  function RightSwipeActions() {
    return (
      <Pressable
        onPress={() => {
          console.log('delete episode', animeId, episode.number);
          deleteEpisodeOffline(animeId, episode.number);
        }}
        style={{
          backgroundColor: colors.error.color,
          justifyContent: 'center',
          alignItems: 'flex-end',
          borderRadius: defaultRadius,
          width: '100%',
        }}>
        <Icon
          color={colors.textLight.color}
          name="trash-can-outline"
          size={30}
          style={{ paddingHorizontal: 16 }}
        />
      </Pressable>
    );
  }

  return (
    <>
      <Modal.Container isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Title title={episode.title} />
        <Button
          label="Delete"
          onPress={() => {
            console.log('delete episode', animeId, episode.number);
            deleteEpisodeOffline(animeId, episode.number);
            setIsOpen(false);
          }}
          type="warning"
        />
      </Modal.Container>
      <Swipeable
        containerStyle={globalStyle.spacerSmall}
        renderRightActions={RightSwipeActions}>
        <Pressable
          onLongPress={() => setIsOpen(true)}
          style={[
            styles.cardContainer,
            progressMinutes
              ? null
              : {
                  borderBottomLeftRadius: defaultRadius,
                  borderBottomRightRadius: defaultRadius,
                },
          ]}>
          <View style={[styles.innerCard]}>
            {episode.pathToFile ? (
              <Pressable
                onPress={() =>
                  navigation.navigate(RootStackScreenNames.NativePlayer, {
                    uri: offlineFS.getAbsolutePath(episode.pathToFile),
                    episodeTitle: episode.title,
                    episodeNumber: episode.number,
                    title: animeName,
                  })
                }
                style={styles.watchStatus}>
                <Icon color={colors.textLight.color} name="play" size={30} />
              </Pressable>
            ) : (
              <Icon
                color={colors.textLight.color}
                name="file-alert-outline"
                size={30}
              />
            )}
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
}

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
    borderColor: DarkColor.C800,
    backgroundColor: DarkColor.C900,
  },
  linksContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 150,
    backgroundColor: DarkColor.C800,
  },
  description: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  playersList: {
    marginTop: 10,
    backgroundColor: DarkColor.C900,
    borderRadius: defaultRadius,
  },
  playersListItem: {
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: DarkColor.C700,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playersListContainer: {
    backgroundColor: DarkColor.C800,
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
