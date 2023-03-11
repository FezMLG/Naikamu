import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  GestureResponderEvent,
  Text,
} from 'react-native';
import { Media } from '@aniwatch/shared';
import { darkStyle } from '../../styles/darkMode.style';
import { ProgressiveImage } from '../ProgressiveImage';

const BrowseElement = ({
  anime,
  handlePageChange,
}: {
  anime: Media;
  handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  const [textHeight, setTextHeight] = useState(140);

  return (
    <Pressable
      key={anime.id}
      style={[styles.card, darkStyle.card]}
      onPress={handlePageChange}>
      <View
        style={[styles.poster, { backgroundColor: anime.coverImage.color }]}>
        <ProgressiveImage
          source={anime.coverImage.extraLarge}
          style={styles.poster}
        />
      </View>
      <View
        onLayout={e => setTextHeight(e.nativeEvent.layout.height)}
        style={[styles.titleContainer, { bottom: textHeight }]}>
        <Text style={[darkStyle.font, styles.title]} numberOfLines={4}>
          {anime.title.romaji}
        </Text>
        <Text
          style={[{ color: anime.coverImage.color }, styles.subTitle]}
          numberOfLines={1}>
          {anime.studios.nodes[0]?.name ?? ''}
        </Text>
      </View>
    </Pressable>
  );
};

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
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
  subTitle: {
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
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
});

export default BrowseElement;
