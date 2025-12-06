import React, { useEffect, useState } from 'react';

import { WatchStatus } from '@naikamu/shared';
import { Picker } from '@react-native-picker/picker';
import { ColorValue, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
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

  useEffect(() => {
    if (selectedStatus !== initialWatchStatus) {
      mutation.mutate();
    }
  }, [selectedStatus]);

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
          marginLeft: 10,
          width: 30,
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
      <View
        style={{
          width: Math.floor((parentWidth || 200) * 0.75) - 40,
          ...select.inputContainer,
        }}>
        <Picker
          dropdownIconColor={colors.textLight.color}
          mode="dialog"
          onValueChange={(value: WatchStatus) => {
            setSelectedStatus(value);
          }}
          prompt={translate('watch_list.select_status')}
          selectedValue={selectedStatus}
          style={select.input}>
          <Picker.Item
            label={
              watching === WatchStatus.NotFollowing
                ? translate('watch_list.add')
                : translate('watch_list.remove')
            }
            value={WatchStatus.NotFollowing}
          />
          <Picker.Item
            label={translate('watch_list.Planning')}
            value={WatchStatus.Planning}
          />
          <Picker.Item
            label={translate('watch_list.Watching')}
            value={WatchStatus.Watching}
          />
          <Picker.Item
            label={translate('watch_list.Completed')}
            value={WatchStatus.Completed}
          />
          <Picker.Item
            label={translate('watch_list.OnHold')}
            value={WatchStatus.OnHold}
          />
          <Picker.Item
            label={translate('watch_list.Dropped')}
            value={WatchStatus.Dropped}
          />
        </Picker>
        {/*<View style={select.iconContainer}>*/}
        {/*  <Icon color={colors.textLight.color} name="chevron-down" size={24} />*/}
        {/*</View>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    width: '75%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.accent.color,
    borderRadius: defaultRadius,
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
    height: '100%',
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
