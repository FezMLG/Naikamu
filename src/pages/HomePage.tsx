import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { RoutesNames } from '../routes/RoutesNames.enum';
import { darkStyle } from '../styles/darkMode.style';
import { Text } from 'react-native-paper';
import { globalStyle } from '../styles/global.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusButton } from '../components/FocusButton';

const HomePage = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text variant="headlineLarge" style={darkStyle.font}>
        Welcome to AniWatch
      </Text>
      <View style={[globalStyle.spacerBig]} />
      <Image
        style={styles.logo}
        source={require('../../assets/aniwatch_logo_t.png')}
      />
      <View style={[globalStyle.spacerBig]} />
      <FocusButton
        onPress={() => navigation.navigate(RoutesNames.Browse)}
        style={[]}>
        <Text variant="titleLarge" style={darkStyle.fontReverse}>
          Browse
        </Text>
      </FocusButton>
    </SafeAreaView>
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