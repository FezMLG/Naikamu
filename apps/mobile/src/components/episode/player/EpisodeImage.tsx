import React from 'react';

import { StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import { useTranslate } from '../../../i18n/useTranslate';
import { colors, defaultRadius, fontStyles } from '../../../styles';
import { PlatformExplicit } from '../../PlatformExplicit';
import { ProgressiveImage } from '../../ProgressiveImage';

const WatchedLabel = () => {
  const { translate } = useTranslate();

  return (
    <LabelContainer>
      <Text style={[fontStyles.label, colors.textLight]}>
        {translate('Watched')}
      </Text>
    </LabelContainer>
  );
};

export const EpisodeImage = ({
  source,
  isWatched = false,
  isUpcoming = false,
}: {
  source: string;
  isWatched?: boolean;
  isUpcoming?: boolean;
}) => (
  <>
    {isWatched ? (
      <Overlay>
        <WatchedLabel />
      </Overlay>
    ) : null}
    {isUpcoming ? (
      <Overlay>
        <Icon
          color={colors.accent.color}
          name="clock-outline"
          size={50}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            top: 15,
            left: 30,
          }}
        />
      </Overlay>
    ) : null}
    <PlatformExplicit availablePlatforms={['ios']}>
      <ProgressiveImage
        resizeMode={FastImage.resizeMode.cover}
        source={source}
        style={[styles.poster]}
      />
    </PlatformExplicit>
    <PlatformExplicit availablePlatforms={['android']}>
      <ProgressiveImage
        resizeMode={FastImage.resizeMode.cover}
        source={source}
        style={[styles.poster, { borderRadius: defaultRadius }]}
      />
    </PlatformExplicit>
  </>
);

const Overlay = styled.View`
  width: 30%;
  height: 100%;
  border-radius: ${defaultRadius}px;
  position: absolute;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LabelContainer = styled.View`
  border-radius: ${defaultRadius}px;
  align-self: flex-start;
  justify-content: flex-start;
  background-color: black;
  padding-vertical: 5px;
  padding-horizontal: 10px;
`;

const styles = StyleSheet.create({
  poster: {
    width: '30%',
    height: 80,
    borderTopLeftRadius: defaultRadius,
    borderBottomLeftRadius: defaultRadius,
  },
});
