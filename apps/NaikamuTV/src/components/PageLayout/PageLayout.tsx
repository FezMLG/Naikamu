import React, { useState } from 'react';

import { Linking, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../styles';
import { ActivityIndicator, Button } from '../atoms';

const Loading = ({ isLoading }: { isLoading: boolean }) => (
  <>
    {isLoading ? (
      <View style={globalStyle.centered}>
        <ActivityIndicator size="large" />
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
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const PageLayout = {
  Loading,
  Error,
};
