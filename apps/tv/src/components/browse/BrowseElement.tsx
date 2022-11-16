import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import CardShadow from '../CardShadow';
import { Media } from '../../interfaces';
import { darkStyle } from '../../styles/darkMode.style';
import { ProgressiveImage } from '../ProgressiveImage';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const cardHeight = 220;
const cardWidth = 150;

const BrowseElement = ({
  anime,
  handlePageChange,
}: {
  anime: Media;
  handlePageChange: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <CardShadow focus={focus} shadowColor={anime.coverImage.color}>
      <Pressable
        key={anime.id}
        style={[styles.card, darkStyle.card]}
        onFocus={() => setFocus(!focus)}
        onBlur={() => setFocus(!focus)}
        onPress={handlePageChange}>
        <View>
          <View
            style={[
              styles.poster,
              { backgroundColor: anime.coverImage.color },
            ]}>
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
        </View>
      </Pressable>
    </CardShadow>
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
    width: cardWidth,
    height: cardHeight,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    width: cardWidth,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
    bottom: 65,
    fontWeight: 'bold',
  },
  card: {
    height: cardHeight,
    width: cardWidth,
    maxWidth: cardWidth + 20,
    marginVertical: 10,
    margin: 10,
  },
  linearGradient: {
    position: 'relative',
    bottom: cardHeight / 3,
    width: cardWidth,
    height: cardHeight / 3,
    borderRadius: 8,
  },
});

export default BrowseElement;
