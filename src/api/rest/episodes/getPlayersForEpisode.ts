import { RestClient } from '../RestClient';

interface Response {
  id: number;
  anime_id: string;
  anime_episode_number: number;
  player: string;
  player_hosting: string;
  created_at: string;
  translator: string;
  translator_title: string;
  translator_url: string;
}

export const getPlayersForEpisode = async (
  title: string,
  episodeNumber: number,
) => {
  const restClient = new RestClient(
    'https://api-aniwatch.herokuapp.com/api/anime/',
  );
  const episode = await restClient.get<Response>(
    `${encodeURI(title)}/episode/${episodeNumber}`,
  );
  return episode;
};
