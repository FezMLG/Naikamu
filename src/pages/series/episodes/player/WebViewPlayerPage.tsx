import { StyleSheet, View } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

import { WatchWebViewPageProps } from '../../../../routes/interfaces';

const WebViewPlayerPage = ({ route }: WatchWebViewPageProps) => {
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

export default WebViewPlayerPage;
