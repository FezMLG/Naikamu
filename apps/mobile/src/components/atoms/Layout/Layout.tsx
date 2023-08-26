import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

import { Snackbar } from '../Snackbar';

const useInfoHandler = () => {
  const [info, setInfo] = useState<string>('');

  return {
    info,
    setInfo,
  };
};

const useSnackbar = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return {
    visible,
    setVisible,
  };
};

function Default({
  children,
  info,
  visible,
  setVisible,
  style = [],
}: {
  children: React.ReactNode;
  info: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  style?: ViewStyle[];
}) {
  return (
    <SafeAreaView style={[styles.container, ...style]}>
      {children}
      <Snackbar
        actionLabel="Ok"
        setVisible={setVisible}
        text={info}
        visible={visible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export const useLayout = () => {
  const { info, setInfo } = useInfoHandler();
  const { visible, setVisible } = useSnackbar();

  return {
    info,
    visible,
    setInfo,
    setVisible,
  };
};

export const PageLayout = {
  Default,
};
