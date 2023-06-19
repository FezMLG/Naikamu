import React from 'react';
import { OfflineEpisode, useLayout } from '../../components';
import { OfflineWatchSeriesEpisodesScreenProps } from '../../routes/main/mylist/offline/interface';
import { Text } from 'react-native';

const OfflineSeriesEpisodesScreen = ({
  route,
}: OfflineWatchSeriesEpisodesScreenProps) => {
  const { seriesId, title, episodes } = route.params;
  const { PageLayout } = useLayout();

  return (
    <PageLayout>
      <Text>{title}</Text>
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
    </PageLayout>
  );
};

export default OfflineSeriesEpisodesScreen;
