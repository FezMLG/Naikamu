import React from 'react';

import { IAnimeListItem } from '@naikamu/shared';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { PageLayout } from '..';
import { useQueryGetMostPopularAnimeInCurrentSeason } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../styles';

import { MostPopularElement } from './MostPopularElement';

export type MostPopularListProps = Record<string, never>;

export const MostPopularSection: React.FC<MostPopularListProps> = ({}) => {
  const { translate } = useTranslate();

  return (
    <View style={globalStyle.marginTopBig}>
      <Text
        style={[fontStyles.header, colors.textLight, globalStyle.marginBottom]}>
        {translate('home.headers.mostPopular')}
      </Text>
      <List />
    </View>
  );
};

const List = () => {
  const { data, refetch, isRefetching, isLoading, isError } =
    useQueryGetMostPopularAnimeInCurrentSeason();
  const { translate } = useTranslate();

  if (isLoading) {
    return <PageLayout.Loading isLoading={isLoading} />;
  }

  if (isError) {
    return <PageLayout.Error isError={isError} refetch={refetch} />;
  }

  if (data) {
    return (
      <FlatList
        data={data}
        horizontal
        onRefresh={refetch}
        refreshing={isRefetching}
        renderItem={({ item }: { item: IAnimeListItem }) => (
          <MostPopularElement item={item} />
        )}
      />
    );
  }

  return (
    <View style={[styles.mainContainerSize, styles.mainContainer]}>
      <Icon
        color={colors.textLighter.color}
        name="archive-alert-outline"
        size={48}
      />
      <Text style={[fontStyles.normal, colors.textLight]}>
        {translate('home.emptyState.mostPopular')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerSize: {
    width: '100%',
    height: 180,
  },
  mainContainer: {
    borderColor: colors.accent.color,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
