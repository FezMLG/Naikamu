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

const Default = ({
  children,
  info,
  visible,
  setVisible,
  style,
}: {
  children: React.ReactNode;
  info: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  style: ViewStyle[];
}) => {
  return (
    <SafeAreaView style={[styles.container, ...style]}>
      {children}
      <Snackbar
        text={info}
        visible={visible}
        actionLabel={'Ok'}
        setVisible={setVisible}
      />
    </SafeAreaView>
  );
};

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
    PageLayout: ({
      children,
      style,
    }: {
      children: React.ReactNode;
      style?: ViewStyle[];
    }) => {
      return (
        <Default
          info={info}
          visible={visible}
          setVisible={setVisible}
          style={style ? style : []}>
          {children}
        </Default>
      );
    },
    setInfo,
    setVisible,
  };
};
