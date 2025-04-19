import React, { useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { Platform, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-media-console';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Video, { OnProgressData, VideoRef } from 'react-native-video';

import { useMutationUpdateUserSeriesWatchProgress } from '../../api/hooks';
import { RootStackNativePlayerScreenProps } from '../../routes';
import { createEpisodeProgressKey, useActiveSeriesStore } from '../../services';
import { storageGetData, storageStoreData, logger } from '../../utils';

export function NativeVideoPlayerScreen({
  route,
  navigation,
}: RootStackNativePlayerScreenProps) {
  const [lastSave, setLastSave] = useState(0);
  const { uri, episodeTitle, episodeNumber, seriesId, referer } = route.params;
  const videoPlayer = useRef<VideoRef>(null);
  const storageKey = createEpisodeProgressKey(seriesId, episodeNumber);
  const { mutation } = useMutationUpdateUserSeriesWatchProgress(
    seriesId,
    episodeNumber,
  );

  const episodeActions = useActiveSeriesStore(store => store.actions);

  useEffect(() => {
    // SystemNavigationBar.immersive();
  }, []);

  useFocusEffect(
    React.useCallback(
      () => async () => {
        const episode = episodeActions.getEpisode(episodeNumber);

        mutation.mutate({
          progress: episode.progress,
          isWatched: episode.isWatched,
        });
      },
      [],
    ),
  );

  const handleProgress = async (progress: OnProgressData) => {
    const roundedProgress = Math.round(progress.currentTime);

    if (roundedProgress % 5 === 0 && roundedProgress !== lastSave) {
      setLastSave(() => roundedProgress);

      /**
       * if video has length then
       * <20 minutes then leftForWatched = 2 minutes
       * 20 >= length < 60 minutes then leftForWatched = 3 minutes
       * >60 minutes then leftForWatched = 5 minutes
       */
      let leftForWatched = 2 * 60;

      if (
        progress.seekableDuration >= 20 * 60 &&
        progress.seekableDuration < 60 * 60
      ) {
        leftForWatched = 3 * 60;
      } else if (progress.seekableDuration > 60 * 60) {
        leftForWatched = 5 * 60;
      }

      await storageStoreData(storageKey, progress);
      episodeActions.updateEpisode(episodeNumber, {
        progress: progress.currentTime,
        isWatched:
          progress.currentTime >= progress.seekableDuration - leftForWatched,
      });
    }
  };

  const handleVideoLoad = async () => {
    const episode = episodeActions.getEpisode(episodeNumber);
    const progress = await storageGetData<OnProgressData>(storageKey);

    const currentTime =
      episode.progress !== 0 && episode.progress >= (progress?.currentTime ?? 0)
        ? episode.progress
        : (progress?.currentTime ?? 0);

    console.log(uri);
    if (videoPlayer) {
      videoPlayer.current?.seek(currentTime - 15);
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
          onError={error => {
            logger('VideoPlayer').warn('Error', error);
            Sentry.captureException(error);
          }}
          onLoad={handleVideoLoad}
          onProgress={handleProgress}
          playInBackground
          ref={videoPlayer}
          resizeMode="contain"
          source={{
            uri,
            headers: {
              Referer: referer,
            },
            metadata: {
              title: episodeTitle,
            },
          }}
          style={styles.absoluteFill}
        />
      ) : (
        <VideoPlayer
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
          onError={(error: unknown) => {
            logger('VideoPlayer').warn('Error', error);
            Sentry.captureException(error);
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
            headers: {
              Referer: referer,
            },
            metadata: {
              title: episodeTitle,
            },
          }}
          style={styles.absoluteFill}
          title={episodeTitle}
          // @ts-expect-error fix me
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
