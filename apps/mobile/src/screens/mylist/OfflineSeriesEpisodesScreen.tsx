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
          number={episode.number}
          title={episode.title}
          length={episode.length}
          translator={episode.translator}
          animeId={animeId}
          animeName={animeName}
        />
      ))}
    </PageLayout>
  );
};

export default OfflineSeriesEpisodesScreen;
