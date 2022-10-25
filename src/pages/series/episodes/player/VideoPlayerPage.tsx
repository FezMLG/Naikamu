import {
  StyleSheet,
  useTVEventHandler,
  HWEvent,
  View,
  Platform,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Video, { OnProgressData } from 'react-native-video';
import { ActivityIndicator } from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';

import { getVideoUrl } from '../../../../api/video/getVideoUrl';
import {
  RoutesNames,
  WatchNativePageProps,
} from '../../../../routes/interfaces';
import { storageGetData, storageStoreData } from '../../../../utils';

const NativeVideoPlayerPage = ({ route, navigation }: WatchNativePageProps) => {
  const { isTV } = Platform;
  const { uri, player, episodeTitle } = route.params;
  const video = useRef<Video>(null);
  const videoPlayer = useRef<VideoPlayer>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const { data, error } = useQuery([uri], () => getVideoUrl(player, uri), {
    retry: 3,
  });

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

  const handleProgress = async (progress: OnProgressData) => {
    if (Math.round(progress.currentTime) % 5 === 0) {
      await storageStoreData(`${uri}`, progress);
    }
  };

  const handleVideoLoad = async () => {
    const progress = await storageGetData<OnProgressData>(`${uri}`);
    if (video) {
      video.current?.seek(progress?.currentTime ?? 0);
    }
    if (videoPlayer) {
      videoPlayer.current?.seekTo(progress?.currentTime ?? 0);
    }
  };

  if (error) {
    navigation.navigate(RoutesNames.WatchWebView, {
      uri: uri,
    });
  }

  return (
    <View style={styles.fullscreenVideo}>
      <>
        {data ? (
          <>
            {isTV ? (
              <Video
                ref={video}
                style={styles.absoluteFill}
                source={{
                  uri: data,
                }}
                controls={true}
                resizeMode={'contain'}
                paused={isPaused}
                fullscreen={true}
                onProgress={handleProgress}
                onVideoLoad={handleVideoLoad}
              />
            ) : (
              <VideoPlayer
                ref={videoPlayer}
                style={styles.absoluteFill}
                title={episodeTitle}
                source={{
                  uri: data,
                }}
                resizeMode={'contain'}
                paused={isPaused}
                fullscreen={true}
                onBack={navigation.goBack}
                onProgress={handleProgress}
                onLoad={handleVideoLoad}
              />
            )}
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
