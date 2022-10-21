import { AnimeSeason } from '../enums/anime-season.enum';

export interface AnimeDetails {
  sourceId: number;
  dataSource: string;
  bannerImage: string;
  coverImage: {
    extraLarge: string;
    color: string;
  };
  title: Title;
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
  relations: Relation[];
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

export interface Relation {
  relationType: string;
  id: number;
  title: Title;
}

interface Title {
  english?: string;
  romaji: string;
}
