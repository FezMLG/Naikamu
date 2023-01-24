export interface AnimeEpisodes {
  episodes: AnimeEpisode[];
}

export interface AnimeEpisode {
  id: string;
  poster_url: string | null;
  title: string;
  number: number;
  description: string;
}
