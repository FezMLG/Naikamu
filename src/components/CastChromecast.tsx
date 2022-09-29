import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CastButton,
  useRemoteMediaClient,
  CastContext,
  PlayServicesState,
} from 'react-native-google-cast';

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
  return <CastButton style={styles.castButton} />;
};

const styles = StyleSheet.create({
  castButton: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
});
