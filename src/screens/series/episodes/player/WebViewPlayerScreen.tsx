import { StyleSheet, View } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

import { WatchWebViewScreenProps } from '../../../../routes/main';

const WebViewPlayerScreen = ({ route }: WatchWebViewScreenProps) => {
  const { uri } = route.params;

  return (
    <View style={[styles.container]}>
      <WebView source={{ uri: uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewPlayerScreen;
