import React from 'react';
import { OfflineEpisode, PageLayout, useLayout } from '../../components';
import { ScrollView } from 'react-native';
import { useOfflineService } from '../../services';
import { DownloadStackSeriesEpisodesScreenProps } from '../../routes';

export const DownloadSeriesEpisodesScreen = ({
  route,
}: DownloadStackSeriesEpisodesScreenProps) => {
  const { seriesId, title, episodes } = route.params;
  const layout = useLayout();
  const { offlineSeries } = useOfflineService();

  return (
    <PageLayout.Default {...layout}>
      <ScrollView>
        {offlineSeries
          .find(e => e.seriesId === seriesId)
          ?.episodes.sort((a, b) => a.number - b.number)
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
