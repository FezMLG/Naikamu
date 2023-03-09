import { StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import Video, { OnProgressData } from 'react-native-video';

import { storageGetData, storageStoreData } from '../../../../utils';
import { WatchNativeScreenProps } from '../../../../routes/main';
import VideoPlayer from 'react-native-media-console';

const NativeVideoPlayerScreen = ({
  route,
  navigation,
}: WatchNativeScreenProps) => {
  const { uri, episodeTitle } = route.params;
  const videoPlayer = useRef<Video>(null);

  const handleProgress = async (progress: OnProgressData) => {
    if (Math.round(progress.currentTime) % 5 === 0) {
      await storageStoreData(`${uri}`, progress);
    }
  };

  const handleVideoLoad = async () => {
    const progress = await storageGetData<OnProgressData>(`${uri}`);
    if (videoPlayer) {
      videoPlayer.current?.seek(progress?.currentTime ?? 0);
    }
  };

  return (
    <View style={styles.fullscreenVideo}>
      <VideoPlayer
        videoRef={videoPlayer}
        style={styles.absoluteFill}
        title={episodeTitle}
        source={{
          uri: uri,
        }}
        resizeMode={'contain'}
        fullscreen={true}
        onBack={navigation.goBack}
        onProgress={handleProgress}
        onLoad={handleVideoLoad}
        doubleTapTime={130}
        disableFullscreen={true}
        disableVolume={true}
        showTimeRemaining={true}
        showDuration={true}
      />
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

export default NativeVideoPlayerScreen;
