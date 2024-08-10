import React from 'react';

import { IAnimeListItem } from '@naikamu/shared';
import { FlatList, Text, View } from 'react-native';

import { useQueryGetMostPopularAnimeInCurrentSeason } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../styles';

import { MostPopularElement } from './MostPopularElement';

export type MostPopularListProps = Record<string, never>;

export const MostPopularList: React.FC<MostPopularListProps> = ({}) => {
  const { data, refetch, isRefetching } =
    useQueryGetMostPopularAnimeInCurrentSeason();
  const { translate } = useTranslate();

  return (
    <View>
      <Text
        style={[fontStyles.header, colors.textLight, globalStyle.marginBottom]}>
        {translate('home.headers.continueWatching')}
      </Text>
      {data ? (
        <FlatList
          data={data}
          horizontal
          onRefresh={refetch}
          refreshing={isRefetching}
          renderItem={({ item }: { item: IAnimeListItem }) => (
            <MostPopularElement item={item} />
          )}
        />
      ) : null}
    </View>
  );
};
