import { StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { RoutesNames } from '../routes/RoutesNames.enum';
import { darkStyle } from '../styles/darkMode.style';

const HomePage = ({ navigation }: any) => {
  return (
    <View style={[styles.container, darkStyle.background]}>
      <Button
        title="Browse"
        onPress={() => navigation.navigate(RoutesNames.Browse)}
      />
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
