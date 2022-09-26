import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import React, { useRef, useState } from 'react';
import Controls from '../components/Controls';
import { useQuery } from '@tanstack/react-query';
import Video from 'react-native-video';
import { getVideoUrl } from '../api/video/getVideoUrl';
import { ActivityIndicator, Text } from 'react-native-paper';
import { darkStyle } from '../styles/darkMode.style';

const VideoPlayerPage = ({ _navigation, route }: any) => {
  const { title, uri, player } = route.params;
  const { data, isError } = useQuery(
    ['episodes' + title],
    () => getVideoUrl(player, uri),
    { retry: false },
  );
  const DEBUG = true;
  const video = useRef<Video>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState<any>({});
  let { isTV } = Platform;
  if (DEBUG) {
    isTV = !isTV;
  }

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
          controls={!isTV}
          resizeMode={'contain'}
          // isLooping
          // shouldPlay
          // onPlaybackStatusUpdate={setStatus}
          // onFullscreenUpdate={setOrientation}
          // onFullscreenPlayerDidPresent={setOrientation}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={'#C539F7'} />
        </View>
      )}
      {isTV && (
        <Controls
          status={status}
          video={video}
          title={route.params.videoTitle}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttons: {
    margin: 16,
  },
});

export default VideoPlayerPage;
