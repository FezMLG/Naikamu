import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Pressable, View, Text, StyleSheet } from 'react-native';

import { IOfflineSeries, useOfflineService } from '../../services';
import { globalStyle, fontStyles, colors, defaultRadius } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { humanFileSize } from '../../utils/humanFileSize';
import { Button, Modal } from '../atoms';
import { useTranslate } from '../../i18n/useTranslate';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { DownloadStackParamList, DownloadStackScreenNames } from '../../routes';

export const OfflineSeries = ({ series }: { series: IOfflineSeries }) => {
  const { translate } = useTranslate();
  const { seriesId, title, episodes, quality } = series;
  const navigation = useNavigation<NavigationProp<DownloadStackParamList>>();
  const { deleteSeriesOffline } = useOfflineService();
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <Animated.View entering={SlideInLeft}>
        <Pressable
          style={[styles.seriesContainer, globalStyle.spacer]}
          onPress={() =>
            navigation.navigate(DownloadStackScreenNames.SeriesEpisodes, series)
          }
          onLongPress={() => {
            setModalVisible(true);
          }}>
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
            name={'chevron-left'}
            size={36}
            color={'white'}
            style={styles.chevronIcon}
          />
        </Pressable>
      </Animated.View>
      <Modal.Container setIsOpen={setModalVisible} isOpen={modalVisible}>
        <Modal.Title title={title} />
        <Button
          label={'Delete'}
          type="warning"
          onPress={() => {
            console.log('delete', seriesId);
            deleteSeriesOffline(seriesId);
            setModalVisible(false);
          }}
        />
      </Modal.Container>
    </>
  );
};

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
