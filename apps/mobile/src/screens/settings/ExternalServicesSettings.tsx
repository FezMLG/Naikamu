import React from 'react';

import { ActionType, WatchListImportStatus } from '@naikamu/shared';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import {
  useMutationSaveShindenUserId,
  useQueryUser,
  useQueryWatchListImport,
  useQueryWatchListImportHistory,
} from '../../api/hooks';
import {
  ActivityIndicator,
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
import { colors, DarkColor, fontStyles, globalStyle } from '../../styles';

const getIconForStatus = (status: WatchListImportStatus) => {
  switch (status) {
    case 'AlreadyImported': {
      return 'clock-outline';
    }
    case 'Completed': {
      return 'check';
    }
    case 'Pending': {
      return 'timer-sand';
    }
    default: {
      return 'alert-circle-outline';
    }
  }
};

export function ExternalServicesSettings({
  navigation,
}: SettingsStackExternalServicesSettingsScreenProps) {
  // const user = useUserStore(state => state.user);
  const { data: user } = useQueryUser();
  const { mutation } = useMutationSaveShindenUserId();
  const { data: watchListImportHistory } = useQueryWatchListImportHistory();
  const { refetch } = useQueryWatchListImport();

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
            <Link
              URL="#"
              label="How to find my Shiden User ID?"
              style={globalStyle.marginTopSmall}
            />
          </>
        ) : null}
      </SettingsGroup>
      <View
        style={[
          {
            flexDirection: 'column',
            alignItems: 'center',
          },
          globalStyle.marginTop,
        ]}>
        <Button
          disabled={
            user && (user.shindenUserId === null || user.shindenUserId === '')
          }
          label="Import from shinden"
          onPress={() => refetch()}
          type="secondary"
        />
        <Link
          URL="#"
          label="You can only import once a day"
          style={globalStyle.marginTopSmall}
        />
      </View>
      <View style={[globalStyle.marginTop]}>
        <Text style={[[colors.textLight, fontStyles.headerSmall]]}>
          Your last imports
        </Text>
        <ScrollView>
          {user && user.shindenUserId && watchListImportHistory ? (
            watchListImportHistory.map(importHistory => (
              <Card
                key={importHistory.id}
                style={{
                  backgroundColor: DarkColor.C900,
                }}>
                <Row
                  style={{
                    alignItems: 'center',
                  }}>
                  {importHistory.status === 'InProgress' ? (
                    <ActivityIndicator
                      size="small"
                      style={{ marginLeft: 5 }}
                      visible
                    />
                  ) : (
                    <Icon
                      color={colors.textLight.color}
                      name={getIconForStatus(importHistory.status)}
                      size={30}
                    />
                  )}
                  <Text
                    style={[
                      colors.textLight,
                      fontStyles.normal,
                      { marginLeft: 5 },
                    ]}>
                    {importHistory.status}
                  </Text>
                </Row>
                <Row>
                  <Text style={[colors.textLight, fontStyles.normal]}>
                    {formatDistanceToNow(importHistory.createdAt, {
                      locale: pl,
                    })}{' '}
                    temu
                  </Text>
                </Row>
              </Card>
            ))
          ) : (
            <Card
              style={{
                backgroundColor: DarkColor.C900,
              }}>
              <Text style={[colors.textLight, fontStyles.normal]}>
                No Last Imports
              </Text>
            </Card>
          )}
        </ScrollView>
      </View>
    </PageLayout.Default>
  );
}

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 70px;
  padding: 0 15px;
  margin: 5px 0;
  border-radius: 8px;
`;

const Row = styled.View`
  flex-direction: row;
`;

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
