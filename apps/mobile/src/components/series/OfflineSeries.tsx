import React from 'react';

import { ActionsheetIcon, TrashIcon } from '@gluestack-ui/themed';
import { Icon as GlueIcon } from '@gluestack-ui/themed/build/components/Icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import {
  DownloadStackParameterList as DownloadStackParameterList,
  DownloadStackScreenNames,
} from '../../routes';
import { IOfflineSeries, useOfflineService } from '../../services';
import { globalStyle, fontStyles, colors, defaultRadius } from '../../styles';
import { humanFileSize } from '../../utils/humanFileSize';
import { ActionSheet, ActionSheetItem, useActionSheet } from '../atoms';

export function OfflineSeries({ series }: { series: IOfflineSeries }) {
  const { translate } = useTranslate();
  const { seriesId, title, episodes, quality } = series;
  const navigation =
    useNavigation<NavigationProp<DownloadStackParameterList>>();
  const { deleteSeriesOffline } = useOfflineService();
  const { showActionSheet, setShowActionSheet } = useActionSheet();

  return (
    <>
      <Animated.View entering={SlideInLeft}>
        <Pressable
          onLongPress={() => {
            setShowActionSheet(true);
          }}
          onPress={() =>
            navigation.navigate(DownloadStackScreenNames.SeriesEpisodes, series)
          }
          style={[styles.seriesContainer, globalStyle.spacer]}>
          {/* <ProgressiveImage
          source={'https://i.imgur.com/2nCt3Sbl.jpg'}
          style={[styles.poster]}
        /> */}
          <View style={[styles.details]}>
            <Text
              style={[styles.title, fontStyles.headerSmall, colors.textLight]}>
              {title}
            </Text>
            <Text style={[fontStyles.label, colors.textLight]}>
              {translate('myList.common.episodes')}: {episodes.length} |{' '}
              {humanFileSize(
                episodes.reduce((partialSum, a) => partialSum + a.size, 0),
              )}{' '}
              | {quality}
            </Text>
          </View>
          <Icon
            color="white"
            name="chevron-left"
            size={36}
            style={styles.chevronIcon}
          />
        </Pressable>
      </Animated.View>
      <ActionSheet
        setShowActionSheet={setShowActionSheet}
        showActionSheet={showActionSheet}>
        <ActionSheetItem
          label={translate('buttons.delete')}
          onPress={() => {
            console.log('delete', seriesId);
            deleteSeriesOffline(seriesId);
          }}>
          {/** @ts-expect-error wrong types **/}
          <ActionsheetIcon
            style={{
              height: 20,
            }}>
            {/** @ts-expect-error wrong types **/}
            <GlueIcon as={TrashIcon} style={{ color: colors.error.color }} />
          </ActionsheetIcon>
        </ActionSheetItem>
      </ActionSheet>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  seriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    marginLeft: 10,
  },
  poster: {
    height: 115,
    width: 85,
    borderRadius: defaultRadius,
    resizeMode: 'cover',
  },
  chevronIcon: {
    transform: [{ rotate: '180deg' }],
  },
});
