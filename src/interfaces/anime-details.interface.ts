import { AnimeSeason } from '../enums/anime-season.enum';

export interface AnimeDetails {
  sourceId: number;
  dataSource: string;
  bannerImage: string;
  coverImage: {
    extraLarge: string;
    color: string;
  };
  title: {
    english?: string;
    romaji: string;
  };
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  popularity: number;
  description: string;
  status: string;
  genres: string[];
  format: string;
  episodes: number;
  duration: number;
  averageScore: number;
  season: AnimeSeason;
  seasonYear: number;
  nextAiringEpisode?: {
    airingAt: number;
    episode: number;
  };
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  };
}
