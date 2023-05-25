import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
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
}: {
  children: React.ReactNode;
  info: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  return (
    <SafeAreaView style={styles.container}>
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
    marginVertical: 16,
  },
});

export const Layout = () => {
  const { info, setInfo } = useInfoHandler();
  const { visible, setVisible } = useSnackbar();

  return {
    PageLayout: ({ children }: { children: React.ReactNode }) => {
      return (
        <Default info={info} visible={visible} setVisible={setVisible}>
          {children}
        </Default>
      );
    },
    setInfo,
    setVisible,
  };
};
