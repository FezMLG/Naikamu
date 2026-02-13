import React, { useEffect, useState } from 'react';

import { WatchStatus } from '@naikamu/shared';
import { ColorValue, Pressable, StyleSheet, Text, View } from 'react-native';
import { default as Config } from 'react-native-config';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMutationUpdateUserWatchList } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { useActiveSeriesStore } from '../../services';
import { colors, defaultRadius, fontStyles } from '../../styles';
import { Modal } from '../atoms';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as WatchStatus);
    setIsModalOpen(false);
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
        onPress={() => setIsModalOpen(true)}
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

      <Modal.Container isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <View style={styles.modalHeader}>
          <Text
            style={[fontStyles.header, colors.textLight, styles.modalTitle]}>
            {translate('watch_list.select_status')}
          </Text>
          <Pressable
            onPress={() => setIsModalOpen(false)}
            style={styles.closeButton}>
            <Icon color={colors.textLight.color} name="close" size={24} />
          </Pressable>
        </View>
        <RadioButton.Group
          onValueChange={handleStatusChange}
          value={selectedStatus}>
          {getFilteredStatusOptions().map(status => {
            // Check if this is the NotFollowing status (Remove from list)
            const isRemoveOption = status === WatchStatus.NotFollowing;

            return (
              <React.Fragment key={status}>
                {/* Add divider before "Remove from list" option */}
                {isRemoveOption && (
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                  </View>
                )}

                <Pressable
                  onPress={() => handleStatusChange(status)}
                  style={styles.radioItem}>
                  <View style={styles.radioItemContent}>
                    {watchIconRender(status)}
                    <Text
                      style={[
                        fontStyles.paragraph,
                        colors.textLight,
                        styles.radioLabel,
                      ]}>
                      {getStatusLabel(status)}
                    </Text>
                  </View>
                  <RadioButton value={status} />
                </Pressable>
              </React.Fragment>
            );
          })}
        </RadioButton.Group>
      </Modal.Container>
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  dividerContainer: {
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.grey.color,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  radioItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioLabel: {
    marginLeft: 10,
  },
});
