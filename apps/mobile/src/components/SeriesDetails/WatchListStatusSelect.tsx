import React, { useState } from 'react';

import { WatchStatus } from '@naikamu/shared';
import { ColorValue, Platform, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMutationUpdateUserWatchList } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, defaultRadius, fontStyles } from '../../styles';

interface WatchListStatusSelectProps {
  seriesId: string;
  initialWatchStatus: WatchStatus;
  parentWidth: number;
}

export function WatchListStatusSelect({
  seriesId,
  initialWatchStatus,
  parentWidth,
}: WatchListStatusSelectProps) {
  const { translate } = useTranslate();
  const [selectedStatus, setSelectedStatus] =
    useState<WatchStatus>(initialWatchStatus);
  const { watching, mutation } = useMutationUpdateUserWatchList(
    selectedStatus,
    seriesId,
  );

  const watchIconRender = (status: WatchStatus) => {
    let icon = 'movie-open-plus';
    let color: ColorValue = colors.textLight.color;

    switch (status) {
      case WatchStatus.Planning: {
        icon = 'movie-open';
        break;
      }

      case WatchStatus.Watching: {
        icon = 'movie-open';
        color = colors.accent.color;
        break;
      }

      case WatchStatus.Completed: {
        icon = 'movie-open-check';
        break;
      }

      case WatchStatus.Dropped: {
        icon = 'movie-off';
        break;
      }

      case WatchStatus.OnHold: {
        icon = 'movie-open-minus';
        break;
      }
    }

    return (
      <Icon
        color={color}
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
      {watchIconRender(selectedStatus)}
      <RNPickerSelect
        Icon={() => (
          <Icon color={colors.textLight.color} name="chevron-down" size={24} />
        )}
        items={[
          {
            key: WatchStatus.Planning,
            label: translate('watch_list.Planning'),
            value: WatchStatus.Planning,
          },
          {
            key: WatchStatus.Watching,
            label: translate('watch_list.Watching'),
            value: WatchStatus.Watching,
          },
          {
            key: WatchStatus.Completed,
            label: translate('watch_list.Completed'),
            value: WatchStatus.Completed,
          },
          {
            key: WatchStatus.OnHold,
            label: translate('watch_list.OnHold'),
            value: WatchStatus.OnHold,
          },
          {
            key: WatchStatus.Dropped,
            label: translate('watch_list.Dropped'),
            value: WatchStatus.Dropped,
          },
        ]}
        onDonePress={() => mutation.mutate()}
        onValueChange={value => {
          setSelectedStatus(() => value);

          if (Platform.OS === 'android') {
            return mutation.mutate();
          }
        }}
        placeholder={{
          key: WatchStatus.NotFollowing,
          label:
            watching === WatchStatus.NotFollowing
              ? translate('watch_list.add')
              : translate('watch_list.remove'),
          value: WatchStatus.NotFollowing,
          inputLabel:
            watching === WatchStatus.NotFollowing
              ? translate('watch_list.add')
              : translate('watch_list.remove'),
        }}
        style={{
          inputIOSContainer: {
            width: Math.floor(parentWidth * 0.75),
            ...select.inputContainer,
          },
          inputAndroidContainer: {
            width: Math.floor(parentWidth * 0.75),
            ...select.inputContainer,
          },
          placeholder: {
            ...colors.textLight,
          },
          inputIOS: select.input,
          inputAndroid: select.input,
          iconContainer: select.iconContainer,
        }}
        useNativeAndroidPickerStyle={false}
        value={selectedStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
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
  selectInputContainer: {},
});

const select = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'white',
    height: '100%',
    borderRadius: defaultRadius,
    justifyContent: 'center',
  },
  input: {
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
    borderLeftWidth: 2,
  },
});
