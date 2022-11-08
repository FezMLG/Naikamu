import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CastButton,
  useRemoteMediaClient,
  CastContext,
  PlayServicesState,
} from 'react-native-google-cast';
import { Text } from 'react-native-paper';
import { darkColor } from '../styles/darkMode.style';

export const CastChromecast = ({ linkToMP4 }: { linkToMP4: string }) => {
  const client = useRemoteMediaClient();
  if (client) {
    // Send the media to your Cast device as soon as we connect to a device
    // (though you'll probably want to call this later once user clicks on a video or something)
    client.loadMedia({
      mediaInfo: {
        contentUrl: linkToMP4,
        contentType: 'video/mp4',
      },
    });
  }

  CastContext.getPlayServicesState().then(state => {
    if (state && state !== PlayServicesState.SUCCESS) {
      CastContext.showPlayServicesErrorDialog(state);
    }
  });
  return (
    <View style={styles.row}>
      <CastButton style={styles.castButton} />
      <Text variant="bodyLarge">Cast</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  castButton: {
    marginLeft: 5,
    marginRight: 3,
    width: 40,
    height: 40,
    tintColor: darkColor.Font,
  },
});
