import React from 'react';
import { OfflineEpisode, useLayout } from '../../components';
import { OfflineWatchSeriesEpisodesScreenProps } from '../../routes/main/mylist/offline/interface';
import { Text } from 'react-native';

const OfflineSeriesEpisodesScreen = ({
  route,
}: OfflineWatchSeriesEpisodesScreenProps) => {
  const { animeId, animeName, episodes } = route.params;
  const { PageLayout } = useLayout();

  return (
    <PageLayout>
      <Text>{animeName}</Text>
      {episodes.map(episode => (
        <OfflineEpisode
          key={episode.number}
          animeId={animeId}
          animeName={animeName}
          episode={episode}
        />
      ))}
    </PageLayout>
  );
};

export default OfflineSeriesEpisodesScreen;
