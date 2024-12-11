import React from 'react';

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
import {
  useLayoutMessageService,
  useLayoutMessageStore,
} from '../../../services/layout-info';
import { colors, fontStyles, globalStyle } from '../../../styles';
import { Button } from '../Button';
import { ActivityIndicator } from '../Loader';
import { Snackbar } from '../Snackbar';

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
                Linking.openURL('https://github.com/FezMLG/Naikamu/issues')
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
  style = [],
  margin = true,
}: {
  children: React.ReactNode;
  style?: ViewStyle[];
  margin?: boolean;
}) {
  const layoutService = useLayoutMessageService();
  const layoutStore = useLayoutMessageStore(state => state);

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
        setVisible={layoutService.setIsMessageVisible}
        text={layoutStore.message}
        visible={layoutStore.isVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const PageLayout = {
  Default,
  Loading,
  Error,
};
