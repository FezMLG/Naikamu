import React, { useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { HWEvent, StyleSheet, View, useTVEventHandler } from 'react-native';
import VideoPlayer from 'react-native-media-console';
import Video, { OnProgressData } from 'react-native-video';

import { useMutationUpdateUserSeriesWatchProgress } from '../../api/hooks/watch-list/useMutationUpdateUserSeriesWatchProgress';
import { RootStackNativePlayerScreenProps } from '../../routes';
import {
  createEpisodeProgressKey,
  useSelectedSeriesStore,
} from '../../services';
import { logger, storageGetData, storageStoreData } from '../../utils';

export function NativeVideoPlayerScreen({
  route,
  navigation,
}: RootStackNativePlayerScreenProps) {
  const { uri, episodeTitle, episodeNumber, seriesId } = route.params;
  const videoPlayer = useRef<Video>(null);
  const [lastSave, setLastSave] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const episodeProgressKey = createEpisodeProgressKey(seriesId, episodeNumber);
  const episodeActions = useSelectedSeriesStore(store => store.actions);
  const { mutation } = useMutationUpdateUserSeriesWatchProgress(
    seriesId,
    episodeNumber,
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

      await storageStoreData(episodeProgressKey, progress);
      episodeActions.updateEpisode(episodeNumber, {
        progress: progress.currentTime,
        isWatched:
          progress.currentTime >= progress.seekableDuration - leftForWatched,
      });
    }
  };

  const handleVideoLoad = async () => {
    const episode = episodeActions.getEpisode(episodeNumber);
    const progress = await storageGetData<OnProgressData>(episodeProgressKey);

    const currentTime =
      episode.progress !== 0 && episode.progress >= (progress?.currentTime ?? 0)
        ? episode.progress
        : progress?.currentTime ?? 0;

    console.log(uri);
    if (videoPlayer) {
      videoPlayer.current?.seek(currentTime - 15);
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
        onError={error => {
          logger('VideoPlayer').warn('Error', error);
          Sentry.captureException(error);
        }}
        onLoad={handleVideoLoad}
        onProgress={handleProgress}
        onVideoError={() => {
          logger('VideoPlayer').warn('Video Error');
          Sentry.captureException('Unknown video error');
        }}
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
