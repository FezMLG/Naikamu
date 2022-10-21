import { StyleSheet, View } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

import { maxHeight, maxWidth } from '../../../../components/maxDimensions';
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
    width: maxWidth(),
    height: maxHeight(),
  },
});

export default WebViewPlayerPage;
