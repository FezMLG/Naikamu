export interface AnimeEpisodes {
  episodes: AnimeEpisode[];
  num_of_episodes: number;
}

export interface AnimeEpisode {
  id: string;
  poster_url: string | null;
  title: string;
  number: number;
  description: string;
}
