import { StyleSheet, useTVEventHandler, HWEvent, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from 'react-native-video';
import { ActivityIndicator, Text } from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';

import { getVideoUrl } from '../../../../api/video/getVideoUrl';
import { WatchNativePageProps } from '../../../../routes/interfaces';

const NativeVideoPlayerPage = ({ route, navigation }: WatchNativePageProps) => {
  const { uri, player } = route.params;
  const { data, error } = useQuery([uri], () => getVideoUrl(player, uri), {
    retry: false,
  });
  // const DEBUG = true;
  const video = useRef<Video>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState<any>({});
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // let { isTV } = Platform;
  // if (DEBUG) {
  //   isTV = !isTV;
  // }

  const myTVEventHandler = (evt: HWEvent) => {
    switch (evt.eventType) {
      case 'playPause':
        setIsPaused(!isPaused);
        break;
      case 'play':
        setIsPaused(false);
        break;

      default:
        break;
    }
  };

  useTVEventHandler(myTVEventHandler);

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
    <View style={styles.fullscreenVideo}>
      <>
        {error && <Text>{JSON.stringify(error)}</Text>}
        {data ? (
          <>
            <VideoPlayer
              ref={video}
              style={styles.absoluteFill}
              source={{
                uri: data,
              }}
              resizeMode={'contain'}
              paused={isPaused}
              fullscreen={true}
              onBack={navigation.goBack}
            />
          </>
        ) : (
          <ActivityIndicator size="large" color={'#C539F7'} />
        )}
        {/* {isTV && (
        <Controls
          status={status}
          video={video}
          title={route.params.videoTitle}
        />
      )} */}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 16,
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  fullscreenVideo: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    elevation: 1,
  },
});

export default NativeVideoPlayerPage;
