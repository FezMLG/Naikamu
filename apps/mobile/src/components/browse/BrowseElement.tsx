import React, { useState } from 'react';

import { Media } from '@aniwatch/shared';
import {
  StyleSheet,
  View,
  Pressable,
  GestureResponderEvent,
  Text,
} from 'react-native';

import { darkStyle, defaultRadius } from '../../styles';
import { ProgressiveImage } from '../ProgressiveImage';

export function BrowseElement({
  anime,
  handlePageChange,
}: {
  anime: Media;
  handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  const [textHeight, setTextHeight] = useState(140);

  return (
    <Pressable
      key={anime.id}
      onPress={handlePageChange}
      style={[styles.card, darkStyle.card]}>
      <View
        style={[styles.poster, { backgroundColor: anime.coverImage.color }]}>
        <ProgressiveImage
          source={anime.coverImage.extraLarge}
          style={styles.poster}
        />
      </View>
      <View
        onLayout={event => setTextHeight(event.nativeEvent.layout.height)}
        style={[styles.titleContainer, { bottom: textHeight }]}>
        <Text numberOfLines={4} style={[darkStyle.font, styles.title]}>
          {anime.title.romaji}
        </Text>
        <Text
          numberOfLines={1}
          style={[{ color: anime.coverImage.color }, styles.subTitle]}>
          {anime.studios.nodes[0]?.name ?? ''}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: defaultRadius,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  subTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
  },
  card: {
    height: 280,
    width: 180,
    margin: 8,
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomStartRadius: defaultRadius,
    borderBottomEndRadius: defaultRadius,
  },
});
