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
import LinearGradient from 'react-native-linear-gradient';

const BrowseElement = ({
  anime,
  handlePageChange,
}: {
  anime: Media;
  handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  const [focus, setFocus] = useState(false);

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
        <LinearGradient
          colors={['transparent', 'black']}
          locations={[0, 1]}
          style={styles.linearGradient}
        />
      </View>
      <Text
        variant="titleMedium"
        numberOfLines={2}
        style={[styles.title, darkStyle.font]}>
        {anime.title.romaji}
      </Text>
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
    width: 200,
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
    bottom: 65,
    fontWeight: 'bold',
  },
  card: {
    height: 300,
    width: 200,
    maxWidth: 220,
    marginVertical: 10,
    margin: 10,
  },
  linearGradient: {
    position: 'relative',
    bottom: 100,
    width: 200,
    height: 100,
    borderRadius: 8,
  },
});

export default BrowseElement;
