import React from 'react';
import { OfflineEpisode, useLayout } from '../../components';
import { OfflineWatchSeriesEpisodesScreenProps } from '../../routes/main/mylist/offline/interface';
import { ScrollView, Text } from 'react-native';
import { colors, fontStyles, globalStyle } from '../../styles';

const OfflineSeriesEpisodesScreen = ({
  route,
}: OfflineWatchSeriesEpisodesScreenProps) => {
  const { seriesId, title, episodes } = route.params;
  const { PageLayout } = useLayout();

  return (
    <PageLayout>
      <Text
        style={[fontStyles.header, colors.textLight, globalStyle.spacerSmall]}>
        {title}
      </Text>
      <ScrollView>
        {episodes
          .sort((a, b) => a.number - b.number)
          .map(episode => (
            <OfflineEpisode
              key={episode.number}
              animeId={seriesId}
              animeName={title}
              episode={episode}
            />
          ))}
      </ScrollView>
    </PageLayout>
  );
};

export default OfflineSeriesEpisodesScreen;
