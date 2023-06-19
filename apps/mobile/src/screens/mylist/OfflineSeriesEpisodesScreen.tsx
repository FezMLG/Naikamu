import React from 'react';
import { OfflineEpisode, useLayout } from '../../components';
import { OfflineWatchSeriesEpisodesScreenProps } from '../../routes/main/mylist/offline/interface';
import { Button, Text } from 'react-native';
import { useOfflineService } from '../../services';

const OfflineSeriesEpisodesScreen = ({
  route,
}: OfflineWatchSeriesEpisodesScreenProps) => {
  const { seriesId, title, episodes } = route.params;
  const { PageLayout } = useLayout();
  const { deleteSeriesOffline } = useOfflineService();

  return (
    <PageLayout>
      <Button
        title={'Delete series'}
        onPress={() => {
          deleteSeriesOffline(seriesId);
        }}
      />
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
