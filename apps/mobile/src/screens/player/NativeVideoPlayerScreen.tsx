import React, { useEffect, useRef } from 'react';

import { Platform, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-media-console';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Video, { OnProgressData } from 'react-native-video';

import { RootStackNativePlayerScreenProps } from '../../routes';
import { createEpisodeProgressKey, useActiveSeriesStore } from '../../services';
import { storageGetData, storageStoreData } from '../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { useMutationUpdateUserSeriesWatchProgress } from '../../api/hooks';

export function NativeVideoPlayerScreen({
  route,
  navigation,
}: RootStackNativePlayerScreenProps) {
  const { uri, episodeTitle, episodeNumber, seriesId } = route.params;
  const videoPlayer = useRef<Video>(null);
  const storageKey = createEpisodeProgressKey(seriesId, episodeNumber);
  const { mutation } = useMutationUpdateUserSeriesWatchProgress(
    seriesId,
    episodeNumber,
  );

  const episodeActions = useActiveSeriesStore(store => store.actions);

  useEffect(() => {
    SystemNavigationBar.immersive();
  }, []);

  useFocusEffect(
    React.useCallback(
      () => async () => {
        const progress = await storageGetData<OnProgressData>(storageKey);
        let isWatched;

        if (progress?.currentTime && progress?.playableDuration) {
          isWatched = progress.currentTime / progress.playableDuration >= 0.85;
        }

        episodeActions.updateEpisode(episodeNumber, {
          isWatched,
        });

        mutation.mutate({
          progress: progress?.currentTime ?? 0,
          isWatched,
        });
      },
      [],
    ),
  );

  const handleProgress = async (progress: OnProgressData) => {
    if (Math.round(progress.currentTime) % 5 === 0) {
      await storageStoreData(storageKey, progress);
      episodeActions.updateEpisode(episodeNumber, {
        progress: progress.currentTime,
      });
    }
  };

  const handleVideoLoad = async () => {
    const progress = await storageGetData<OnProgressData>(storageKey);

    console.log(uri);
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
          allowsExternalPlayback
          controls
          fullscreen
          fullscreenAutorotate
          fullscreenOrientation="landscape"
          ignoreSilentSwitch="ignore"
          onLoad={handleVideoLoad}
          onProgress={handleProgress}
          pictureInPicture
          playInBackground
          ref={videoPlayer}
          resizeMode="contain"
          source={{
            uri,
          }}
          style={styles.absoluteFill}
        />
      ) : (
        <VideoPlayer
          // @ts-expect-error broken types
          allowsExternalPlayback
          disableFullscreen
          disableVolume
          doubleTapTime={130}
          fullscreen
          fullscreenAutorotate
          fullscreenOrientation="landscape"
          ignoreSilentSwitch="ignore"
          isFullscreen
          onBack={() => {
            SystemNavigationBar.fullScreen(false);
            navigation.goBack();
          }}
          onHideControls={() => SystemNavigationBar.immersive()}
          onLoad={handleVideoLoad}
          onProgress={handleProgress}
          pictureInPicture
          playInBackground
          resizeMode="contain"
          showDuration
          source={{
            uri: uri,
          }}
          style={styles.absoluteFill}
          title={episodeTitle}
          videoRef={videoPlayer}
        />
      )}
    </>
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
