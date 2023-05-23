import React from 'react';
import { Text } from 'react-native';
import { Snackbar as PaperSnackbar } from 'react-native-paper';
import { colors, fontStyles } from '../../../styles';

export const Snackbar = ({
  text,
  visible,
  actionLabel,
  setVisible,
}: {
  text: string;
  visible: boolean;
  actionLabel: string;
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      action={{
        label: actionLabel,
        onPress: () => {
          setVisible(false);
        },
        textColor: colors.accent.color,
      }}>
      <Text style={[colors.textLight, fontStyles.text]}>{text}</Text>
    </PaperSnackbar>
  );
};
