import React from 'react';

import {
  ActionType,
  IWatchListImport,
  User,
  WatchListImportStatus,
} from '@naikamu/shared';
import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import {
  useMutationAddImportChunk,
  useMutationSaveShindenUserId,
  useQueryUser,
  useQueryWatchListImportHistory,
  useQueryGetWatchListFromShinden,
} from '../../api/hooks';
import {
  ActivityIndicator,
  Button,
  Link,
  PageLayout,
  RefreshButton,
  SettingInputs,
  SettingsGroup,
  useLayout,
} from '../../components';
import { externalLinks } from '../../externalLinks';
import { useTranslate } from '../../i18n/useTranslate';
import {
  SettingsStackExternalServicesSettingsScreenProps,
  SettingsStackScreenNames,
} from '../../routes';
import { colors, DarkColor, fontStyles, globalStyle } from '../../styles';

export function ExternalServicesSettingsScreen({}: SettingsStackExternalServicesSettingsScreenProps) {
  const { data: user } = useQueryUser();
  const { data: watchListImportHistory, refetch: watchListImportRefetch } =
    useQueryWatchListImportHistory();

  const { translate } = useTranslate();

  const layout = useLayout();

  return (
    <PageLayout.Default {...layout}>
      <ScrollView>
        <ShindenSettings user={user} />
        <ImportButton user={user} />
        <View style={[globalStyle.marginTop]}>
          <Row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[[colors.textLight, fontStyles.headerSmall]]}>
              {translate('settings.externalServices.lastImports')}
            </Text>
            <RefreshButton refresh={watchListImportRefetch} />
          </Row>
          {user && user.shindenUserId && watchListImportHistory ? (
            watchListImportHistory.map((importHistory, index) => (
              <ImportHistoryCard importHistory={importHistory} key={index} />
            ))
          ) : (
            <EmptyImportHistoryCard />
          )}
        </View>
      </ScrollView>
    </PageLayout.Default>
  );
}

const ShindenSettings = ({ user }: { user?: User }) => {
  const { translate } = useTranslate();
  const { mutation } = useMutationSaveShindenUserId();
  const navigation = useNavigation<any>();

  return (
    <SettingsGroup title={translate('settings.groups.shindenAccount')}>
      {user ? (
        <>
          <SettingInputs.Edit
            isFirst
            isLast
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
            text={user.shindenUserId}
          />
          <Link
            URL={externalLinks.guides.externalLinks}
            label={translate('settings.externalServices.howToFindShindenId')}
            style={globalStyle.marginTopSmall}
          />
        </>
      ) : null}
    </SettingsGroup>
  );
};

const ImportButton = ({ user }: { user?: User }) => {
  const { translate } = useTranslate();
  const { refetch, isLoading } = useQueryGetWatchListFromShinden({ user });
  const watchListImportMutation = useMutationAddImportChunk();

  return (
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
          (user &&
            (user.shindenUserId === null || user.shindenUserId === '')) ||
          isLoading
        }
        label={translate('settings.externalServices.importFromShinden')}
        loading={isLoading}
        onPress={async () => {
          await refetch();
          watchListImportMutation.mutate();
        }}
        type="secondary"
      />
      <Text
        style={[
          [colors.textLighter, fontStyles.normal, globalStyle.marginTopSmall],
        ]}>
        {translate('settings.externalServices.importLimit')}
      </Text>
    </View>
  );
};

const EmptyImportHistoryCard = () => {
  const { translate } = useTranslate();

  return (
    <Card
      style={{
        backgroundColor: DarkColor.C900,
      }}>
      <Text style={[colors.textLight, fontStyles.normal]}>
        {translate('settings.externalServices.noLastImports')}
      </Text>
    </Card>
  );
};

const ImportHistoryCard = ({
  importHistory,
}: {
  importHistory: IWatchListImport;
}) => {
  const { translate } = useTranslate();

  return (
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
          <ActivityIndicator size="small" style={{ marginLeft: 5 }} visible />
        ) : (
          <Icon
            color={colors.textLight.color}
            name={getIconForStatus(importHistory.status)}
            size={30}
          />
        )}
        <Text style={[colors.textLight, fontStyles.normal, { marginLeft: 5 }]}>
          {importHistory.status}
        </Text>
      </Row>
      <Row>
        <Text style={[colors.textLight, fontStyles.normal]}>
          {formatDistanceToNow(importHistory.createdAt, {
            locale: pl,
          })}{' '}
          {translate('ago')}
        </Text>
      </Row>
    </Card>
  );
};

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 15px;
  margin: 5px 0;
  border-radius: 8px;
`;

const Row = styled.View`
  flex-direction: row;
`;

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
