import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Video, { OnProgressData } from 'react-native-video';

import VideoPlayer from 'react-native-media-console';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { createEpisodeProgressKey } from '../../services';
import { storageGetData, storageStoreData } from '../../utils';
import { RootStackNativePlayerScreenProps } from '../../routes';

export const NativeVideoPlayerScreen = ({
  route,
  navigation,
}: RootStackNativePlayerScreenProps) => {
  const { uri, episodeTitle, episodeNumber, seriesId } = route.params;
  const videoPlayer = useRef<Video>(null);
  const storageKey = createEpisodeProgressKey(seriesId, episodeNumber);

  useEffect(() => {
    SystemNavigationBar.immersive();
  }, []);

  const handleProgress = async (progress: OnProgressData) => {
    if (Math.round(progress.currentTime) % 5 === 0) {
      await storageStoreData(storageKey, progress);
    }
  };

  const handleVideoLoad = async () => {
    const progress = await storageGetData<OnProgressData>(storageKey);
    if (videoPlayer) {
      videoPlayer.current?.seek(
        progress?.currentTime ? progress.currentTime - 15 : 0,
      );
    }
  };

  return (
    <>
      {Platform.OS === 'ios' ? (
        <Video
          source={{
            uri,
          }}
          ref={videoPlayer}
          style={styles.absoluteFill}
          onProgress={handleProgress}
          onLoad={handleVideoLoad}
          resizeMode="contain"
          fullscreen
          fullscreenAutorotate
          fullscreenOrientation="landscape"
          pictureInPicture
          controls
          playInBackground
          allowsExternalPlayback
          ignoreSilentSwitch="ignore"
        />
      ) : (
        <VideoPlayer
          videoRef={videoPlayer}
          style={styles.absoluteFill}
          title={episodeTitle}
          source={{
            uri: uri,
          }}
          resizeMode={'contain'}
          fullscreen
          onBack={navigation.goBack}
          onProgress={handleProgress}
          onLoad={handleVideoLoad}
          doubleTapTime={130}
          disableFullscreen
          disableVolume
          showDuration
          fullscreenOrientation={'landscape'}
          fullscreenAutorotate
          isFullscreen
          pictureInPicture
          playInBackground
          allowsExternalPlayback
          ignoreSilentSwitch="ignore"
        />
      )}
    </>
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
