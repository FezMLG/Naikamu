import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { darkColor } from '../../styles/darkMode.style';
import { colors, defaultRadius, fontStyles } from '../../styles/global.style';
import { useTranslate } from '../../i18n/useTranslate';
import { maxWidth } from '../maxDimensions';
import { storageGetData } from '../../utils';
import { OnProgressData } from 'react-native-video';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OfflineWatchParamList } from '../../routes/main/mylist/offline/interface';
import { ScreenNames } from '../../routes/main';

export const OfflineEpisode = ({
  number,
  title,
  length,
  translator,
  animeId,
  animeName,
}: {
  number: number;
  title: string;
  length: number;
  translator: string;
  animeId: string;
  animeName: string;
}) => {
  const navigation = useNavigation<any>();
  const episodeKey = `${animeId}-${number}-${translator}`.toLowerCase();
  const { translate } = useTranslate();
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const handleVideoProgress = async () => {
    const storageProgress = await storageGetData<OnProgressData>(episodeKey);
    console.log(storageProgress);
    setProgress(storageProgress?.currentTime);
  };

  handleVideoProgress();

  return (
    <SafeAreaView style={[styles.episodeContainer]}>
      <View style={[styles.cardContainer]}>
        <Pressable
          style={[styles.innerCard]}
          onPress={() =>
            navigation.navigate(ScreenNames.WatchNative, {
              uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
              episodeTitle: title,
              episodeNumber: number,
              title: animeName,
            })
          }>
          {/* <Image
            style={[
              styles.poster,
              !isSelected && { borderBottomLeftRadius: defaultRadius },
            ]}
            source={{ uri: posterUrl }}
          /> */}
          <View style={styles.titleRow}>
            <Text numberOfLines={2} style={[styles.title, colors.textLight]}>
              {number + '. ' + title}
            </Text>
            <Text
              numberOfLines={2}
              style={[fontStyles.label, colors.textLight]}>
              {length} min | {translator}
            </Text>
          </View>
          <View style={styles.watchStatus}>
            <Icon name={'play'} size={30} color={colors.textLight.color} />
          </View>
        </Pressable>
        {progress ? (
          <ProgressBar
            progress={progress / (length * 60)}
            theme={{
              colors: {
                primary: colors.accent.color,
              },
            }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  episodeContainer: {
    marginVertical: 16,
    width: '100%',
  },
  poster: {
    width: 110,
    height: 80,
    borderTopLeftRadius: defaultRadius,
  },
  titleRow: {
    width: maxWidth() - 110 - 45 - 22,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
  },
  watchStatus: {
    width: 45,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  innerCard: {
    width: '100%',
    flexDirection: 'row',
  },
  cardContainer: {
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: darkColor.C800,
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
