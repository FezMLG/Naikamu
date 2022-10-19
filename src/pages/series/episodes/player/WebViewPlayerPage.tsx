import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

import { maxHeight, maxWidth } from '../../../../components/maxDimensions';
import { WatchWebViewPageProps } from '../../../../routes/interfaces';

const WebViewPlayerPage = ({ route }: WatchWebViewPageProps) => {
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
    <SafeAreaView style={[styles.container]}>
      <WebView source={{ uri: uri }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: maxWidth(),
    height: maxHeight(),
  },
});

export default WebViewPlayerPage;
