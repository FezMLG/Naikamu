import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

import { darkStyle } from '../../../../styles/darkMode.style';
import { maxHeight, maxWidth } from '../../../../components/maxDimensions';
import { Text } from 'react-native-paper';
import { fontStyles, globalStyle } from '../../../../styles/global.style';
import { WatchErrorPageProps } from '../../../../routes/interfaces';
import { makeRouteFromTitle } from '../../../../utils';

const ErrorPlayerPage = ({ route }: WatchErrorPageProps) => {
  const { playerName, animeTitle } = route.params;
  //TODO styling for this page
  return (
    <SafeAreaView style={[styles.container]}>
      <Text
        variant="headlineLarge"
        style={[darkStyle.font, globalStyle.spacer, fontStyles.warning]}>
        Source {playerName} is not yet implemented!
      </Text>
      <Text
        variant="titleLarge"
        style={[darkStyle.font, globalStyle.spacer, styles.description]}>
        To watch video from this source on your tv, please scan QR code or open
        AniWatch mobile app, select this source and use built in cast to
        Chromecast feature if available
      </Text>
      <QRCode
        size={maxHeight() / 3}
        quietZone={10}
        value={`aniwatch://browse/${makeRouteFromTitle(animeTitle)}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: maxWidth(),
    height: maxHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export default ErrorPlayerPage;
