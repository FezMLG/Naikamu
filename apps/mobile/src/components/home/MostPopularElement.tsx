import React, { useState } from 'react';

import { IAnimeListItem } from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { RootStackScreenNames, SeriesStackScreenNames } from '../../routes';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';

export const MostPopularElement = ({ item }: { item: IAnimeListItem }) => {
  const { navigate } = useNavigation<any>();
  const [textHeight, setTextHeight] = useState(140);

  return (
    <Pressable
      onPress={() =>
        navigate(RootStackScreenNames.SeriesStack, {
          screen: SeriesStackScreenNames.Series,
          params: {
            title: item.title.romaji,
            id: item.id,
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
      <View
        onLayout={event => setTextHeight(event.nativeEvent.layout.height)}
        style={[
          styles.titleProgressContainer,
          {
            bottom: textHeight,
          },
        ]}>
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
    borderRadius: defaultRadius,
  },
  titleProgressContainer: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: defaultRadius,
    borderBottomRightRadius: defaultRadius,
    width: '100%',
    zIndex: 10,
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  progressBar: {
    zIndex: 20,
  },
});
