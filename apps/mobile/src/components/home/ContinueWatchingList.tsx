import React from 'react';

import { FlatList } from 'react-native';

import {
  IContinueWatching,
  useQueryGetContinueWatching,
} from '../../api/hooks';
import { SmallPoster } from '../molecules';

export type ContinueWatchingListProps = Record<string, never>;

export const ContinueWatchingList: React.FC<
  ContinueWatchingListProps
> = ({}) => {
  const { data } = useQueryGetContinueWatching();

  return (
    <>
      {data ? (
        <FlatList
          data={data}
          horizontal
          renderItem={({ item }: { item: IContinueWatching }) => (
            <SmallPoster source={item.imageUrl} />
          )}
        />
      ) : null}
    </>
  );
};
