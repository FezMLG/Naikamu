import React from 'react';

import { FlatList, Text, View } from 'react-native';

import {
  IContinueWatching,
  useQueryGetContinueWatching,
} from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { SmallPoster } from '../molecules';

export type ContinueWatchingListProps = Record<string, never>;

export const ContinueWatchingList: React.FC<
  ContinueWatchingListProps
> = ({}) => {
  const { data } = useQueryGetContinueWatching();
  const { translate } = useTranslate();

  return (
    <View>
      <Text>{translate('continue watching')}</Text>
      {data ? (
        <FlatList
          data={data}
          horizontal
          renderItem={({ item }: { item: IContinueWatching }) => (
            <SmallPoster source={item.imageUrl} />
          )}
        />
      ) : null}
    </View>
  );
};
