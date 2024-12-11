import React from 'react';

import { Text } from 'react-native';
import { Snackbar as PaperSnackbar } from 'react-native-paper';

import { colors, DarkColor, fontStyles } from '../../../styles';

export function Snackbar({
  text,
  visible,
  actionLabel,
  setVisible,
}: {
  text: string | null;
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
      style={{ backgroundColor: DarkColor.C800 }}
      visible={visible}>
      <Text style={[colors.textLight, fontStyles.paragraph]}>{text}</Text>
    </PaperSnackbar>
  );
}
