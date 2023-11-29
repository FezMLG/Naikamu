import React, { useState } from 'react';

import { WatchStatus, WatchStatusNew } from '@naikamu/shared';
import { StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMutationUpdateUserWatchList } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, defaultRadius, fontStyles } from '../../styles';

interface WatchListProps {
  seriesId: string;
  initialWatchStatus: WatchStatusNew;
  parentWidth: number;
}

export function WatchList({
  seriesId,
  initialWatchStatus,
  parentWidth,
}: WatchListProps) {
  const { translate } = useTranslate();
  const [selectedStatus, setSelectedStatus] =
    useState<WatchStatusNew>(initialWatchStatus);
  const { watching, mutation } = useMutationUpdateUserWatchList(
    selectedStatus,
    seriesId,
  );

  const watchIconRender = (status: WatchStatusNew) => {
    let icon = 'movie-open-plus';

    switch (status) {
      case WatchStatusNew.Watching: {
        icon = 'movie-open-star';
        break;
      }

      case WatchStatusNew.Completed: {
        icon = 'movie-open-check';
        break;
      }
    }

    return (
      <Icon
        color={colors.textLight.color}
        name={icon}
        size={24}
        style={{
          alignSelf: 'center',
          position: 'absolute',
          left: 10,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {Config.ENV === 'development' && mutation.isError ? (
        <Text>{'error: ' + mutation.error}</Text>
      ) : null}
      {watchIconRender(watching)}
      <RNPickerSelect
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        Icon={() => (
          <Icon color={colors.textLight.color} name="chevron-down" size={24} />
        )}
        items={Object.entries(WatchStatus).map(([value, label]) => ({
          label: translate(label),
          value,
        }))}
        onDonePress={() => mutation.mutate()}
        onValueChange={value => setSelectedStatus(() => value)}
        placeholder="Select status..."
        style={{
          inputIOSContainer: {
            width: Math.floor(parentWidth * 0.75),
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'white',
            height: '100%',
            borderRadius: defaultRadius,
            justifyContent: 'center',
          },
          placeholder: {
            ...colors.textLight,
          },
          inputIOS: {
            ...colors.textLight,
            ...fontStyles.normal,
            paddingLeft: 40,
          },
          iconContainer: {
            position: 'absolute',
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            borderStyle: 'solid',
            borderColor: 'white',
            height: '100%',
            borderRadius: defaultRadius,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            borderLeftWidth: 1,
          },
          viewContainer: {},
        }}
        value={selectedStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    width: '75%',
  },
  pad: {
    paddingHorizontal: 10,
  },
  statusInfo: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
  },
});
