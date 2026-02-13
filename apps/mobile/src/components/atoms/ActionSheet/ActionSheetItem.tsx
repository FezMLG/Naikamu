import React from 'react';

import { ActionsheetItem, ActionsheetItemText } from '@gluestack-ui/themed';
import { GestureResponderEvent } from 'react-native';

export const ActionSheetItem = ({
  children,
  label,
  onPress,
}: {
  children?: React.ReactNode;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}) => (
  <ActionsheetItem onPress={onPress}>
    {children}
    <ActionsheetItemText>{label}</ActionsheetItemText>
  </ActionsheetItem>
);
