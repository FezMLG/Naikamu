import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Portal,
  SegmentedButtons,
  TextInput,
} from 'react-native-paper';

import { AnimeSeason } from '../../../../../lib/shared/dist';
import { useTranslate } from '../../i18n/useTranslate';

const getButtons = (
  translate: (
    key: string,
    data?: Record<string, unknown> | undefined,
  ) => string,
): {
  value: AnimeSeason;
  label: any;
  icon: string;
}[] => {
  const winter = {
    value: AnimeSeason.Winter,
    label: translate('animeSeason.winter'),
    icon: 'snowflake',
  };
  const spring = {
    value: AnimeSeason.Spring,
    label: translate('animeSeason.spring'),
    icon: 'flower',
  };
  const summer = {
    value: AnimeSeason.Summer,
    label: translate('animeSeason.summer'),
    icon: 'white-balance-sunny',
  };
  const fall = {
    value: AnimeSeason.Fall,
    label: translate('animeSeason.fall'),
    icon: 'leaf',
  };
  let buttons = [winter, spring, summer, fall];
  return buttons;
};

export const SeasonYearSelectButtons = ({
  season,
  setSeason,
  year,
  setYear,
}: {
  season: AnimeSeason;
  setSeason: (season: AnimeSeason) => void;
  year: number;
  setYear: (year: number) => void;
}): JSX.Element => {
  const { translate } = useTranslate();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [newYear, setNewYear] = React.useState(year.toString());

  return (
    <>
      <SegmentedButtons
        value={season}
        onValueChange={value => setSeason(value as AnimeSeason)}
        buttons={getButtons(translate)}
      />
      <Button onPress={showDialog}>{year}</Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Type year</Dialog.Title>
          <TextInput
            label="Year"
            value={newYear}
            keyboardType={'number-pad'}
            onChangeText={text => setNewYear(text)}
          />
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              onPress={() => {
                setYear(Number(newYear));
                hideDialog();
              }}>
              Select
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
