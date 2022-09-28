import {
  StyleSheet,
  SafeAreaView,
  useTVEventHandler,
  HWEvent,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from 'react-native-video';
import { getVideoUrl } from '../../../../api/video/getVideoUrl';
import { ActivityIndicator, Text } from 'react-native-paper';
import { darkStyle } from '../../../../styles/darkMode.style';
import { maxHeight, maxWidth } from '../../../../components/maxDimensions';

const NativeVideoPlayerPage = ({ _navigation, route }: any) => {
  const { title, uri, player } = route.params;
  const { data, isError } = useQuery(
    [player + ':' + title],
    () => getVideoUrl(player, uri),
    { retry: false },
  );
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
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      {isError && <Text>The source is not implemented</Text>}
      {data ? (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: data
              ? data
              : 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          controls={true}
          resizeMode={'contain'}
          paused={isPaused}
          fullscreen={true}
          // isLooping
          // shouldPlay
          // onPlaybackStatusUpdate={setStatus}
          // onFullscreenUpdate={setOrientation}
          // onFullscreenPlayerDidPresent={setOrientation}
        />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: maxWidth(),
    height: maxHeight(),
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16,
  },
});

export default NativeVideoPlayerPage;
