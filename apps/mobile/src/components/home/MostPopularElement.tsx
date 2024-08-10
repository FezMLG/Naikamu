import React from 'react';

import { IAnimeListItem, IContinueWatching } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { RootStackScreenNames, SeriesStackScreenNames } from '../../routes';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';

export const MostPopularElement = ({ item }: { item: IAnimeListItem }) => {
  const { navigate } = useNavigation<any>();

  return (
    <Pressable
      onPress={() =>
        navigate(RootStackScreenNames.SeriesStack, {
          screen: SeriesStackScreenNames.Series,
          params: {
            seriesId: item.id,
          },
        })
      }
      style={styles.mainContainer}>
      <View style={[styles.posterContainer]}>
        <ProgressiveImage
          resizeMode="cover"
          source={item.coverImage.extraLarge}
          style={styles.poster}
        />
      </View>
      <View style={styles.titleProgressContainer}>
        <View style={styles.titleContainer}>
          <Text style={[fontStyles.normal, colors.textLight]}>
            {item.title.romaji}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 120,
    height: 180,
    flexDirection: 'column',
    marginRight: 20,
  },
  posterContainer: {
    width: '100%',
    height: '100%',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: defaultRadius,
    borderTopRightRadius: defaultRadius,
  },
  titleProgressContainer: {
    position: 'relative',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomStartRadius: defaultRadius,
    borderBottomEndRadius: defaultRadius,
    width: '100%',
    height: 40,
    zIndex: 10,
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 37,
  },
  progressBar: {
    zIndex: 20,
  },
});
