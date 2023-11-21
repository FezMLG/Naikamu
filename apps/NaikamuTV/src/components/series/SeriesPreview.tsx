import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { useQuerySeriesDetails } from '../../api/hooks';
import { useSelectedSeriesStore } from '../../services';
import { colors, fontStyles } from '../../styles';
import { ProgressiveImage } from '../atoms';
import { PageLayout } from '../PageLayout';

import { SeriesDetails } from './Series';
import { calculateNumberOfWatched } from '../../utils';
import { useTranslate } from '../../i18n/useTranslate';

export const SeriesPreview = () => {
  const selectedSeries = useSelectedSeriesStore(state => state.series);
  const api = useQuerySeriesDetails();
  const [detailsWidth, setDetailsWidth] = useState(0);
  const { translate } = useTranslate();

  return (
    <>
      {selectedSeries ? (
        <>
          <PageLayout.Loading isLoading={api.isLoading} />
          <PageLayout.Error
            isError={api.isError}
            refetch={() => api.refetch()}
          />
          {api.data ? (
            <>
              <View
                onLayout={event =>
                  setDetailsWidth(event.nativeEvent.layout.width)
                }
                style={styles.details}>
                {/*<Button*/}
                {/*  label={translate('auth.logout')}*/}
                {/*  onPress={() => userService.logoutUser()}*/}
                {/*  type="secondary"*/}
                {/*/>*/}
                <SeriesDetails.Title romaji={selectedSeries.title} />
                {api.data.studios.length > 0 ? (
                  <Text
                    style={[
                      {
                        color: api.data.coverImage.color ?? colors.accent.color,
                      },
                      fontStyles.normal,
                    ]}>
                    {api.data.studios[0].name}
                  </Text>
                ) : null}
                <View style={styles.info}>
                  <Text style={[colors.textLight, fontStyles.normal]}>
                    {translate('anime_details.score')}: {api.data.averageScore}
                  </Text>
                  <Text style={[colors.textLight, fontStyles.normal]}>
                    {translate('animeSeason.' + api.data.season)}{' '}
                    {api.data.seasonYear}
                  </Text>
                </View>
                <SeriesDetails.Genres
                  color={api.data.coverImage.color}
                  genres={api.data.genres}
                />
                <Text style={[fontStyles.normal, colors.textLight]}>
                  {translate('myList.common.watched')}:{' '}
                  {calculateNumberOfWatched(selectedSeries.watched)} /{' '}
                  {api.data.episodes}
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <ProgressiveImage
                  resizeMode="cover"
                  source={api.data.bannerImage ?? ''}
                  style={styles.image}
                />
                <View
                  style={[
                    styles.backdrop,
                    {
                      width: detailsWidth + 20,
                    },
                  ]}
                />
              </View>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  details: {
    gap: 10,
    maxWidth: '60%',
    zIndex: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  info: {
    flexDirection: 'row',
    gap: 20,
  },
  imageContainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    width: '100%',
    height: '100%',
  },
  image: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    zIndex: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '100%',
    position: 'absolute',
  },
});
