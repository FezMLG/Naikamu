import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { darkStyle } from '../styles/darkMode.style';
import WebView from 'react-native-webview';

const WebViewPlayerPage = ({ route }: any) => {
  const { uri } = route.params;

  // function setOrientation() {
  //   if (Dimensions.get('window').height > Dimensions.get('window').width) {
  //     //Device is in portrait mode, rotate to landscape mode.
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   } else {
  //     //Device is in landscape mode, rotate to portrait mode.
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  //   }
  // }

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      <WebView source={{ uri: uri }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default WebViewPlayerPage;
