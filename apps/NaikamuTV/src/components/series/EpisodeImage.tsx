import React from 'react';

import { StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import { useTranslate } from '../../i18n/useTranslate';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { ProgressiveImage } from '../atoms';

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
    <ProgressiveImage
      resizeMode={FastImage.resizeMode.cover}
      source={source}
      style={[styles.poster, { borderRadius: defaultRadius }]}
    />
  </>
);

const Overlay = styled.View`
  width: 40%;
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
    width: '40%',
    height: '100%',
    borderTopLeftRadius: defaultRadius,
    borderBottomLeftRadius: defaultRadius,
  },
});
