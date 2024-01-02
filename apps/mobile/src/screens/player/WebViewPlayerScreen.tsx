import React, { useEffect, useRef, useState } from 'react';

import { Pressable, View } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';

import { RootStackWebViewPlayerScreenProps } from '../../routes';
import { colors } from '../../styles';

export function WebViewPlayerScreen({
  route,
  navigation,
}: RootStackWebViewPlayerScreenProps) {
  const { uri } = route.params;
  const [isReloaded, setIsReloaded] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    SystemNavigationBar.fullScreen(true);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.color }}>
      <WebView
        allowsAirPlayForMediaPlayback
        onLoadEnd={() => {
          if (!isReloaded) {
            webViewRef.current?.reload();
            setIsReloaded(true);
          }
        }}
        originWhitelist={['https://*']}
        ref={webViewRef}
        source={{ uri }}
        style={{
          flex: 1,
          backgroundColor: colors.background.color,
          display: isReloaded ? 'flex' : 'none',
        }}
      />
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: colors.background.color,
          position: 'absolute',
          top: 0,
          right: 0,
          width: 45,
          height: 45,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="close" size={30} style={colors.textLighter} />
      </Pressable>
    </View>
  );
}
