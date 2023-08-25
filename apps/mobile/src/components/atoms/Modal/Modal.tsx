import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { Modal as PaperModal, Portal } from 'react-native-paper';

import {
  colors,
  darkColor,
  darkStyle,
  defaultRadius,
  fontStyles,
} from '../../../styles';

function Container({
  children,
  setIsOpen,
  isOpen,
}: {
  children?: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <Portal>
      <PaperModal
        contentContainerStyle={styles.centeredView}
        onDismiss={() => setIsOpen(false)}
        visible={isOpen}>
        {children}
      </PaperModal>
    </Portal>
  );
}

function Title({ title }: { title: string }) {
  return (
    <Text style={[fontStyles.header, colors.textLight, styles.title]}>
      {title}
    </Text>
  );
}

export const Modal = {
  Container,
  Title,
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: darkColor.C800,
    padding: 10,
    margin: 20,
    borderRadius: defaultRadius,
  },
  title: {
    marginBottom: 20,
  },
});
