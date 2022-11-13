import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';

import { ActionConfirmScreenProps } from '../../routes/main';
import { useTranslate } from '../../i18n/useTranslate';
import { globalStyle } from '../../styles/global.style';

const ActionConfirmScreen = ({ route }: ActionConfirmScreenProps) => {
  const { action, type } = route.params;
  const { translate } = useTranslate();

  return (
    <SafeAreaView style={[styles.container]}>
      <Text variant="titleLarge">
        {translate('actions.' + type + '.action_name')}
      </Text>
      <Text
        variant="bodyMedium"
        style={[globalStyle.marginTop, globalStyle.textCenter]}>
        {translate('actions.' + type + '.message')}
      </Text>
      <Button
        mode={'outlined'}
        style={[globalStyle.marginTopBig, { borderColor: '#f85149' }]}
        onPress={() => action()}>
        <Text style={{ color: '#f85149' }}>
          {translate('actions.' + type + '.confirm')}
        </Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  highlight: {
    fontWeight: 'bold',
  },
});

export default ActionConfirmScreen;
