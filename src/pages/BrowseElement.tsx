import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Media } from '../interfaces';
import { RoutesNames } from '../routes/RoutesNames.enum';
import { darkStyle } from '../styles/darkMode.style';

const BrowseElement = ({
  anime,
  navigation,
}: {
  anime: Media;
  navigation: any;
}) => {
  const [focus, setFocus] = useState(false);
  const defaultShadow = {
    distace: 0,
    startColor: '#7600bc',
    finalColor: '#7600bc',
  };

  const focusShadow = {
    distace: 2,
  };
  // const onFocus = () => {
  //   console.log('Focused item ', anime.id);
  //   setFocus(true);
  // };

  // const onBlur = () => {
  //   setFocus(false);
  // };

  console.log(anime);

  return (
    <Shadow
      distance={focus ? focusShadow.distace : defaultShadow.distace}
      startColor={defaultShadow.startColor}
      endColor={defaultShadow.finalColor}
      offset={[10, 10]}>
      <Pressable
        key={anime.id}
        style={[styles.card, darkStyle.card]}
        onFocus={() => setFocus(!focus)}
        onBlur={() => setFocus(!focus)}
        onPress={() => {
          navigation.navigate(RoutesNames.Series, {
            id: anime.id,
            title: anime.title.romaji,
          });
        }}>
        <View>
          <Image
            style={styles.poster}
            source={{ uri: anime.coverImage.extraLarge }}
          />
          <Text numberOfLines={2} style={[styles.title, darkStyle.font]}>
            {anime.title.romaji}
          </Text>
        </View>
      </Pressable>
    </Shadow>
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'contain',
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    height: 350,
    width: 200,
    maxWidth: 220,
    marginVertical: 10,
    margin: 10,
  },
});

export default BrowseElement;
