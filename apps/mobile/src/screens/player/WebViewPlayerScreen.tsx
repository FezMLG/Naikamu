import React from 'react';

import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { RootStackWebViewPlayerScreenProps } from '../../routes';

export function WebViewPlayerScreen({
  route,
}: RootStackWebViewPlayerScreenProps) {
  const { uri } = route.params;

  return <WebView source={{ uri }} style={StyleSheet.absoluteFill} />;
}
