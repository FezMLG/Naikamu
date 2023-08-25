import React from 'react';

import { Text } from 'react-native';
import { Snackbar as PaperSnackbar } from 'react-native-paper';

import { colors, darkColor, fontStyles } from '../../../styles';

export function Snackbar({
  text,
  visible,
  actionLabel,
  setVisible,
}: {
  text: string;
  visible: boolean;
  actionLabel: string;
  setVisible: (visible: boolean) => void;
}) {
  return (
    <PaperSnackbar
      action={{
        label: actionLabel,
        onPress: () => {
          setVisible(false);
        },
        textColor: colors.accent.color,
      }}
      onDismiss={() => setVisible(false)}
      style={{ backgroundColor: darkColor.C800 }}
      visible={visible}>
      <Text style={[colors.textLight, fontStyles.text]}>{text}</Text>
    </PaperSnackbar>
  );
}
