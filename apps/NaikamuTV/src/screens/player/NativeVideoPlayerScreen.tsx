import React, { useRef, useState } from 'react';

import { HWEvent, StyleSheet, View, useTVEventHandler } from 'react-native';
import VideoPlayer from 'react-native-media-console';
import Video from 'react-native-video';

import { RootStackNativePlayerScreenProps } from '../../routes';
import { createEpisodeProgressKey, useVideoProgress } from '../../services';

export function NativeVideoPlayerScreen({
  route,
  navigation,
}: RootStackNativePlayerScreenProps) {
  const { uri, episodeTitle, episodeNumber, seriesId } = route.params;
  const videoPlayer = useRef<Video>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { loadProgress, handleSaveVideoProgress } = useVideoProgress(
    createEpisodeProgressKey(seriesId, episodeNumber),
  );

  const myTVEventHandler = (event: HWEvent) => {
    switch (event.eventType) {
      case 'play': {
        setIsPaused(false);
        break;
      }
      case 'pause': {
        setIsPaused(true);
        break;
      }
      case 'playPause': {
        setIsPaused(previous => !previous);
        break;
      }
    }
  };

  useTVEventHandler(myTVEventHandler);

  const handleVideoLoad = async () => {
    const progress = await loadProgress();

    if (videoPlayer) {
      videoPlayer.current?.seek(
        progress?.currentTime ? progress.currentTime - 15 : 0,
      );
    }
  };

  return (
    <View style={styles.absoluteFill}>
      <VideoPlayer
        allowsExternalPlayback
        controlTimeoutDelay={5000}
        disableFullscreen
        disableVolume
        doubleTapTime={130}
        fullscreen
        fullscreenAutorotate
        fullscreenOrientation="landscape"
        hasTVPreferredFocus
        ignoreSilentSwitch="ignore"
        isFullscreen
        onBack={navigation.goBack}
        onLoad={handleVideoLoad}
        onProgress={handleSaveVideoProgress}
        paused={isPaused}
        pictureInPicture
        playInBackground
        resizeMode="contain"
        showDuration
        source={{
          uri: uri,
        }}
        style={styles.absoluteFill}
        tapAnywhereToPause
        title={episodeTitle}
        videoRef={videoPlayer}
      />
    </View>
  );
}

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
