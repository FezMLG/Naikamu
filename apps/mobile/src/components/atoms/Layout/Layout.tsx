import React, { useState } from 'react';

import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../../styles';
import { Button } from '../Button';
import { ActivityIndicator } from '../Loader';
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
}) => {
  const { translate } = useTranslate();

  return (
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
              {translate('errors.error_occurred')}
            </Text>
          </View>
          <View style={{ alignItems: 'center', gap: 10 }}>
            <Button
              label={translate('buttons.reload')}
              onPress={() => refetch()}
              size="medium"
              type="primary"
              width="medium"
            />
            <Button
              icon="open-in-new"
              label={translate('buttons.support')}
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
};

function Default({
  children,
  info,
  visible,
  setVisible,
  style = [],
  margin = true,
}: {
  children: React.ReactNode;
  info: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  style?: ViewStyle[];
  margin?: boolean;
}) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        margin ? { marginHorizontal: 16 } : { margin: 0 },
        ...style,
      ]}>
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
