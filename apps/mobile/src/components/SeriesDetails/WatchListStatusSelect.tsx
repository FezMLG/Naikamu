import React, { useEffect, useState } from 'react';

import { ActionsheetIcon, Box, Divider } from '@gluestack-ui/themed';
import { WatchStatus } from '@naikamu/shared';
import { ColorValue, Pressable, StyleSheet, Text } from 'react-native';
import { default as Config } from 'react-native-config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMutationUpdateUserWatchList } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { useActiveSeriesStore } from '../../services';
import { colors, defaultRadius, fontStyles } from '../../styles';
import {
  ActionSheet,
  ActionSheetItem,
  useActionSheet,
} from '../atoms/ActionSheet';

interface WatchListStatusSelectProps {
  seriesId: string;
  initialWatchStatus: WatchStatus;
  parentWidth: number;
}

export function WatchListStatusSelect({
  seriesId,
  parentWidth: _parentWidth,
}: WatchListStatusSelectProps) {
  const series = useActiveSeriesStore(store => store.series)!;
  const { translate } = useTranslate();
  const [selectedStatus, setSelectedStatus] = useState<WatchStatus>(
    series.watchStatus,
  );
  const { showActionSheet, setShowActionSheet } = useActionSheet();
  const { mutation } = useMutationUpdateUserWatchList(selectedStatus, seriesId);

  useEffect(() => {
    if (selectedStatus !== series.watchStatus && series.watchStatus !== null) {
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
      <Icon color={color} name={icon} size={24} style={styles.statusIcon} />
    );
  };

  const getStatusLabel = (status: WatchStatus) => {
    if (status === WatchStatus.NotFollowing) {
      return selectedStatus === WatchStatus.NotFollowing
        ? translate('watch_list.add')
        : translate('watch_list.remove');
    }

    return translate(`watch_list.${status}`);
  };

  const handleStatusChange = (value: WatchStatus) => {
    setSelectedStatus(value);
    setShowActionSheet(false);
  };

  const getFilteredStatusOptions = () => {
    let statuses = Object.values(WatchStatus);

    // Remove NotFollowing from options if it's currently selected
    if (selectedStatus === WatchStatus.NotFollowing) {
      statuses = statuses.filter(status => status !== WatchStatus.NotFollowing);
    } else {
      // Move NotFollowing to the end of the list
      statuses = statuses.filter(status => status !== WatchStatus.NotFollowing);
      statuses.push(WatchStatus.NotFollowing);
    }

    return statuses;
  };

  return (
    <>
      {Config.ENV === 'development' && mutation.isError ? (
        <Text>{'error: ' + mutation.error}</Text>
      ) : null}
      <Pressable
        onPress={() => setShowActionSheet(true)}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed,
        ]}>
        {watchIconRender(selectedStatus)}
        <Text style={[fontStyles.normal, colors.textLight, styles.labelText]}>
          {getStatusLabel(selectedStatus)}
        </Text>
        <Icon
          color={colors.textLight.color}
          name="chevron-down"
          size={24}
          style={styles.chevronIcon}
        />
      </Pressable>

      <ActionSheet
        setShowActionSheet={setShowActionSheet}
        showActionSheet={showActionSheet}>
        <Box alignItems="flex-start" gap="$3" pb="$6" pt="$2" width="$full">
          {getFilteredStatusOptions().map((status, index) => {
            const isRemoveOption = status === WatchStatus.NotFollowing;
            const isSelected = selectedStatus === status;

            const isLastOption =
              index === getFilteredStatusOptions().length - 1;

            return (
              <React.Fragment key={status}>
                {/* Add divider before "Remove from list" option */}
                {isRemoveOption && (
                  <Divider bg={colors.grey.color} mx="$3" my="$2" />
                )}

                <ActionSheetItem
                  label={getStatusLabel(status)}
                  onPress={() => handleStatusChange(status)}>
                  {/** @ts-expect-error wrong types **/}
                  <ActionsheetIcon style={{ height: 24, width: 24 }}>
                    {watchIconRender(status)}
                  </ActionsheetIcon>
                  {isSelected && (
                    <>
                      {/** @ts-expect-error wrong types **/}
                      <ActionsheetIcon
                        style={{ height: 20, width: 20, marginLeft: 'auto' }}>
                        <Icon
                          color={colors.accent.color}
                          name="check"
                          size={20}
                        />
                      </ActionsheetIcon>
                    </>
                  )}
                </ActionSheetItem>
              </React.Fragment>
            );
          })}
        </Box>
      </ActionSheet>
    </>
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
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  containerPressed: {
    opacity: 0.7,
  },
  statusIcon: {
    alignSelf: 'center',
    width: 30,
  },
  labelText: {
    flex: 1,
    marginLeft: 10,
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
});
