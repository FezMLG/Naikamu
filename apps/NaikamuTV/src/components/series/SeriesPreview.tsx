import React from 'react';

import { Text, View } from 'react-native';

import { useSelectedSeriesStore } from '../../services';
import { colors, fontStyles } from '../../styles';
import { ProgressiveImage } from '../atoms';

import { SeriesDetails } from './Series';

export const SeriesPreview = () => {
  const selectedSeries = useSelectedSeriesStore(state => state.series);

  return (
    <>
      {selectedSeries ? (
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
              <Text style={[colors.textLight, fontStyles.normal]}>
                project No. 9
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
              }}>
              <Text style={[colors.textLight, fontStyles.normal]}>
                Popularność: 89%
              </Text>
              <Text style={[colors.textLight, fontStyles.normal]}>
                Zima 2022
              </Text>
              <Text style={[colors.textLight, fontStyles.normal]}>
                {selectedSeries?.id}
              </Text>
            </View>
            <SeriesDetails.Genres
              genres={['Thriller', 'Action', 'Ecchi', 'Harem']}
            />
          </View>
          <View
            style={{
              flex: 1,
              position: 'absolute',
              right: 0,
              width: '65%',
              height: '100%',
            }}>
            <ProgressiveImage
              resizeMode="cover"
              source={selectedSeries?.poster ?? ''}
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
                width: '30%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </View>
        </>
      ) : null}
    </>
  );
};
