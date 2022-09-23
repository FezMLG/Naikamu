import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
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

  // const onFocus = () => {
  //   console.log('Focused item ', anime.id);
  //   setFocus(true);
  // };

  // const onBlur = () => {
  //   setFocus(false);
  // };

  console.log(anime);

  return (
    <Pressable
      key={anime.id}
      style={[
        styles.card,
        darkStyle.card,
        focus ? styles.wrapperFocused : null,
      ]}
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
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    height: 350,
    width: 200,
    marginVertical: 10,
    margin: 10,
  },
  wrapperFocused: {
    borderColor: 'purple',
    borderWidth: 2,
  },
});

export default BrowseElement;
