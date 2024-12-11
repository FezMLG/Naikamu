import React from 'react';

import { ScrollView } from 'react-native';

import { OfflineEpisode, PageLayout } from '../../components';
import { DownloadStackSeriesEpisodesScreenProps } from '../../routes';
import { useOfflineService } from '../../services';

export function DownloadSeriesEpisodesScreen({
  route,
}: DownloadStackSeriesEpisodesScreenProps) {
  const { seriesId, title } = route.params;
  const { offlineSeries } = useOfflineService();

  return (
    <PageLayout.Default>
      <ScrollView>
        {offlineSeries
          .find(element => element.seriesId === seriesId)
          ?.episodes.sort((a, b) => a.number - b.number)
          .map(episode => (
            <OfflineEpisode
              animeId={seriesId}
              animeName={title}
              episode={episode}
              key={episode.number}
            />
          ))}
      </ScrollView>
    </PageLayout.Default>
  );
}
