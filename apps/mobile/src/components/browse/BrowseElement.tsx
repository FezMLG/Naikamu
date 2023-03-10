import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import { Media } from '@aniwatch/shared';
import { darkStyle } from '../../styles/darkMode.style';
import { ProgressiveImage } from '../ProgressiveImage';
import { Text } from 'react-native-paper';

const BrowseElement = ({
  anime,
  handlePageChange,
}: {
  anime: Media;
  handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  const [focus, setFocus] = useState(false);
  const [textHeight, setTextHeight] = useState(140);

  return (
    <Pressable
      key={anime.id}
      style={[styles.card, darkStyle.card]}
      onFocus={() => setFocus(!focus)}
      onBlur={() => setFocus(!focus)}
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
        <Text variant="titleMedium" numberOfLines={4}>
          {anime.title.romaji}
        </Text>
        <Text
          variant="titleMedium"
          style={[darkStyle.font, { color: anime.coverImage.color }]}
          numberOfLines={1}>
          {anime.studios.nodes[0].name}
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
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: '700',
  },
  card: {
    height: 300,
    width: 200,
    maxWidth: 220,
    marginVertical: 10,
    margin: 10,
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
    width: '100%',
    backgroundColor: '#00000090',
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
});

export default BrowseElement;
