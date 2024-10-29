import React from 'react';

import { IContinueWatching } from '@naikamu/shared';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useQueryGetContinueWatching } from '../../api/hooks';
import { useTranslate } from '../../i18n/useTranslate';
import { colors, fontStyles, globalStyle } from '../../styles';

import { ContinueWatchingElement } from './ContinueWatchingElement';

export type ContinueWatchingListProps = Record<string, never>;

export const ContinueWatchingSection: React.FC<
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
        <>
          {data.length > 0 ? (
            <FlatList
              data={data}
              horizontal
              onRefresh={refetch}
              refreshing={isRefetching}
              renderItem={({ item }: { item: IContinueWatching }) => (
                <ContinueWatchingElement item={item} />
              )}
              style={styles.mainContainerSize}
            />
          ) : (
            <View style={[styles.mainContainerSize, styles.mainContainer]}>
              <Icon
                color={colors.textLighter.color}
                name="video-outline"
                size={48}
              />
              <Text style={[fontStyles.normal, colors.textLight]}>
                {translate('home.emptyState.continueWatching')}
              </Text>
            </View>
          )}
        </>
      ) : (
        <View style={[styles.mainContainerSize, styles.mainContainer]}>
          <Icon
            color={colors.textLighter.color}
            name="video-outline"
            size={48}
          />
          <Text style={[fontStyles.normal, colors.textLight]}>
            {translate('home.emptyState.continueWatching')}
          </Text>
        </View>
      )}
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
