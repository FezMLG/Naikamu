import React from 'react';

import { ActionType } from '@naikamu/shared';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useMutationSaveShindenUserId, useQueryUser } from '../../api/hooks';
import {
  Button,
  Link,
  PageLayout,
  SettingInputs,
  SettingsGroup,
  useLayout,
} from '../../components';
import { useTranslate } from '../../i18n/useTranslate';
import {
  SettingsStackExternalServicesSettingsScreenProps,
  SettingsStackScreenNames,
} from '../../routes';

export function ExternalServicesSettings({
  navigation,
}: SettingsStackExternalServicesSettingsScreenProps) {
  // const user = useUserStore(state => state.user);
  const { data: user } = useQueryUser();
  const { mutation } = useMutationSaveShindenUserId();

  const { translate } = useTranslate();

  const layout = useLayout();

  return (
    <PageLayout.Default {...layout}>
      <SettingsGroup title={translate('settings.groups.accountDetails')}>
        {user ? (
          <>
            <SettingInputs.Edit
              isLast={true}
              label={translate('forms.labels.' + ActionType.ShindenIdChange)}
              onPress={() =>
                navigation.navigate(SettingsStackScreenNames.SettingsAction, {
                  action: mutation.mutate,
                  requiresLogin: false,
                  type: ActionType.ShindenIdChange,
                  origin: SettingsStackScreenNames.ExternalServicesSettings,
                  payload: user.shindenUserId ?? '',
                })
              }
              text={user.shindenUserId ?? ''}
            />
            <Link URL="#" label="How to find my Shiden User ID?" />
          </>
        ) : null}
      </SettingsGroup>
      <Button label="Import from shinden" type="secondary" />
      <Link URL="#" label="You can only import once a day" />
      <View>
        <Text>Your last imports</Text>
        <View>
          <View>
            <Icon name="star" size={30} />
            <Text>Success</Text>
          </View>
          <View>
            <Text>1 hour ago</Text>
          </View>
        </View>
      </View>
    </PageLayout.Default>
  );
}

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    padding: 10,
  },
  checkboxContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  container: {
    marginTop: 16,
  },
  radioContainer: {
    marginVertical: 10,
  },
  radioLabel: {
    marginLeft: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  highlight: {
    fontWeight: 'bold',
  },
  center: {
    alignSelf: 'center',
  },
  textInput: {},
  formInputs: {
    alignItems: 'center',
  },
  width90: {
    maxWidth: 500,
    width: '90%',
    minWidth: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});
