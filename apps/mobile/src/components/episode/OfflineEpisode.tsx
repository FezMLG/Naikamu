import React, { useEffect } from 'react';

import {
  ActionsheetIcon,
  TrashIcon,
  Icon as GlueIcon,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import { RootStackScreenNames } from '../../routes';
import {
  IOfflineSeriesEpisodes,
  useOfflineService,
  createEpisodeProgressKey,
  useVideoProgress,
  offlineFS,
} from '../../services';
import { colors, defaultRadius, fontStyles, DarkColor } from '../../styles';
import { humanFileSize } from '../../utils/humanFileSize';
import { ActionSheet, ActionSheetItem, useActionSheet } from '../atoms';

export function OfflineEpisode({
  episode,
  animeId,
  animeName,
}: {
  episode: IOfflineSeriesEpisodes;
  animeId: string;
  animeName: string;
}): React.ReactElement {
  const { pathToFile, title: episodeTitle, length, translator, size } = episode;
  const navigation = useNavigation<any>();
  const episodeKey = createEpisodeProgressKey(animeId, episode.number);
  const { progressMinutes, loadProgress } = useVideoProgress(episodeKey);
  const { deleteEpisodeOffline } = useOfflineService();
  const { showActionSheet, setShowActionSheet } = useActionSheet();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const { translate } = useTranslate();

  return (
    <>
      <Pressable
        onLongPress={() => setShowActionSheet(true)}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {pathToFile ? (
              <Pressable
                onPress={() =>
                  navigation.navigate(RootStackScreenNames.NativePlayer, {
                    uri: offlineFS.getAbsolutePath(pathToFile),
                    episodeTitle: episodeTitle,
                    episodeNumber: episode.number,
                    title: animeName,
                    seriesId: animeId,
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
                {episode.number + '. ' + episodeTitle}
              </Text>
              <Text
                numberOfLines={2}
                style={[fontStyles.label, colors.textLight]}>
                {length} min | {translator} | {humanFileSize(size ?? 0)}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => setShowActionSheet(true)}
            style={{
              marginRight: 20,
            }}>
            <Icon
              color={colors.textLight.color}
              name="dots-horizontal"
              size={30}
            />
          </Pressable>
        </View>
        <ProgressBar
          progress={progressMinutes / length}
          theme={{
            colors: {
              primary: colors.accent.color,
            },
          }}
        />
      </Pressable>
      <ActionSheet
        setShowActionSheet={setShowActionSheet}
        showActionSheet={showActionSheet}>
        <ActionSheetItem
          label={translate('buttons.delete')}
          onPress={() => {
            console.log('delete episode', animeId, episode.number);
            deleteEpisodeOffline(animeId, episode.number);
          }}>
          {/** @ts-expect-error wrong types **/}
          <ActionsheetIcon
            style={{
              height: 20,
            }}>
            {/** @ts-expect-error wrong types **/}
            <GlueIcon as={TrashIcon} style={{ color: colors.error.color }} />
          </ActionsheetIcon>
        </ActionSheetItem>
      </ActionSheet>
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
    justifyContent: 'space-between',
  },
  cardContainer: {
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: DarkColor.C800,
    backgroundColor: DarkColor.C900,
    marginVertical: 10,
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
