import { StyleSheet, View } from 'react-native';
import React from 'react';
import { RoutesNames } from '../routes/RoutesNames.enum';
import { darkStyle } from '../styles/darkMode.style';
import { Button } from 'react-native-paper';

const HomePage = ({ navigation }: any) => {
  return (
    <View style={[styles.container, darkStyle.background]}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(RoutesNames.Browse)}>
        Browse
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
});

export default HomePage;
