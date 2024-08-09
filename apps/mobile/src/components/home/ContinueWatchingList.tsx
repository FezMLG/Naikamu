import React from 'react';

import { IContinueWatching } from '@naikamu/shared';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useQueryGetContinueWatching } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../styles';

import { HomeEpisodeElement } from './HomeEpisodeElement';

export type ContinueWatchingListProps = Record<string, never>;

export const ContinueWatchingList: React.FC<
  ContinueWatchingListProps
> = ({}) => {
  const { data, refetch, isRefetching } = useQueryGetContinueWatching();
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
          renderItem={({ item }: { item: IContinueWatching }) => (
            <HomeEpisodeElement item={item} />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});
