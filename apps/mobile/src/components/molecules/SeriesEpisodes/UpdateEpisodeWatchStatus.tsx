import React from 'react';

import { ActionsheetIcon, CheckCircleIcon } from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMutationUpdateUserSeriesWatchProgress } from '../../../api/hooks';
import { useTranslate } from '../../../i18n/useTranslate';
import { useActiveSeriesStore } from '../../../services';
import { colors } from '../../../styles';
import { ActionSheetItem } from '../../atoms';

interface UpdateEpisodeWatchStatusProps {
  animeId: string;
  episodeNumber: number;
  handleClose: () => void;
}

export function UpdateEpisodeWatchStatus({
  animeId,
  episodeNumber,
  handleClose,
}: UpdateEpisodeWatchStatusProps) {
  const { translate } = useTranslate();
  const activeSeriesStore = useActiveSeriesStore(store => store.actions);
  const episode = activeSeriesStore.getEpisode(episodeNumber);
  const { mutation } = useMutationUpdateUserSeriesWatchProgress(
    animeId,
    episodeNumber,
  );

  return (
    <ActionSheetItem
      label={episode.isWatched ? 'Mark as unwatched' : 'Mark as watched'}
      onPress={() => {
        activeSeriesStore.updateEpisode(episodeNumber, {
          isWatched: !episode.isWatched,
        });

        mutation.mutate({
          isWatched: !episode.isWatched,
        });
        handleClose();
      }}>
      {/** @ts-expect-error wrong types **/}
      <ActionsheetIcon
        style={{
          height: 20,
        }}>
        <Icon
          name={episode.isWatched ? 'minus' : 'plus'}
          size={20}
          style={colors.textLight}
        />
      </ActionsheetIcon>
    </ActionSheetItem>
  );
}
