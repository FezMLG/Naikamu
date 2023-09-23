import React, { useState } from 'react';

import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { Snackbar } from '../Snackbar';
import { colors, fontStyles, globalStyle } from '../../../styles';
import { ActivityIndicator } from '../Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../Button';

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

const Loading = ({ isLoading }: { isLoading: boolean }) => (
  <>
    {isLoading ? (
      <View style={globalStyle.centered}>
        <ActivityIndicator size="large" visible={true} />
      </View>
    ) : null}
  </>
);

const Error = ({
  isError,
  refetch,
}: {
  isError: boolean;
  refetch: () => void;
}) => (
  <>
    {isError ? (
      <View style={[globalStyle.centered, { gap: 40 }]}>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Icon
            color={colors.error.color}
            name="alert-circle-outline"
            size={50}
          />
          <Text
            style={[
              fontStyles.headerSmall,
              colors.error,
              {
                textAlign: 'center',
                maxWidth: 300,
              },
            ]}>
            Something went wrong. {'\n'} Please try again later or contact
            support.
          </Text>
        </View>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Button
            label="Reload"
            onPress={() => refetch()}
            size="medium"
            type="primary"
            width="medium"
          />
          <Button
            icon="open-in-new"
            label="Support"
            onPress={() =>
              Linking.openURL('https://github.com/FezMLG/AniWatch/issues')
            }
            size="medium"
            type="link"
            width="medium"
          />
        </View>
      </View>
    ) : null}
  </>
);

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
  Loading,
  Error,
};
