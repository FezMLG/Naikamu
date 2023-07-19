import React from 'react';
import { OfflineEpisode, PageLayout, useLayout } from '../../components';
import { OfflineWatchSeriesEpisodesScreenProps } from '../../routes/main/mylist/offline/interface';
import { ScrollView } from 'react-native';

const OfflineSeriesEpisodesScreen = ({
  route,
}: OfflineWatchSeriesEpisodesScreenProps) => {
  const { seriesId, title, episodes } = route.params;
  const layout = useLayout();

  return (
    <PageLayout.Default {...layout}>
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
    </PageLayout.Default>
  );
};

export default OfflineSeriesEpisodesScreen;
