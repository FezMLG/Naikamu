import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { RoutesNames } from '../routes/RoutesNames.enum';
import { darkStyle } from '../styles/darkMode.style';
import { Button, Text } from 'react-native-paper';
import { globalStyle } from '../styles/global.style';

const HomePage = ({ navigation }: any) => {
  return (
    <View style={[styles.container, darkStyle.background]}>
      <Text variant="headlineLarge">Welcome to AniWatch</Text>
      <View style={[globalStyle.spacerBig]} />
      <Image
        style={styles.logo}
        source={require('../../assets/aniwatch_logo_t.png')}
      />
      <View style={[globalStyle.spacerBig]} />
      <Button
        mode="contained"
        onPress={() => navigation.navigate(RoutesNames.Browse)}>
        <Text variant="titleLarge" style={darkStyle.fontReverse}>
          Browse
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
});

export default HomePage;
