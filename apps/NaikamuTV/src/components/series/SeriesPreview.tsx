import React from 'react';

import { Text, View } from 'react-native';

import { useQuerySeriesDetails } from '../../api/hooks';
import { useSelectedSeriesStore } from '../../services';
import { colors, fontStyles } from '../../styles';
import { ProgressiveImage } from '../atoms';

import { SeriesDetails } from './Series';
import { PageLayout } from '../PageLayout';

export const SeriesPreview = () => {
  const selectedSeries = useSelectedSeriesStore(state => state.series);
  const api = useQuerySeriesDetails();

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
                style={{
                  gap: 15,
                  width: '60%',
                  flex: 1,
                  zIndex: 10,
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                {/*<Button*/}
                {/*  label={translate('auth.logout')}*/}
                {/*  onPress={() => userService.logoutUser()}*/}
                {/*  type="secondary"*/}
                {/*/>*/}
                <View>
                  <SeriesDetails.Title
                    romaji={selectedSeries?.title}
                    styles={{
                      width: '100%',
                    }}
                  />
                  {api.data.studios.length > 0 ? (
                    <Text
                      style={[
                        {
                          color:
                            api.data.coverImage.color ?? colors.accent.color,
                        },
                        fontStyles.normal,
                      ]}>
                      {api.data.studios[0].name}
                    </Text>
                  ) : null}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 20,
                  }}>
                  <Text style={[colors.textLight, fontStyles.normal]}>
                    Popularność: {api.data.popularity}
                  </Text>
                  <Text style={[colors.textLight, fontStyles.normal]}>
                    {api.data.season} {api.data.seasonYear}
                  </Text>
                  <Text style={[colors.textLight, fontStyles.normal]}>
                    {selectedSeries?.id}
                  </Text>
                </View>
                <SeriesDetails.Genres
                  color={api.data.coverImage.color}
                  genres={api.data.genres}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  right: 0,
                  width: '100%',
                  height: '100%',
                }}>
                <ProgressiveImage
                  resizeMode="cover"
                  source={api.data.bannerImage ?? ''}
                  style={{
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                  }}
                />
                <View
                  style={{
                    zIndex: 5,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    width: '60%',
                    height: '100%',
                    position: 'absolute',
                  }}
                />
              </View>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};
