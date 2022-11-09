import { AnimeSeason } from '../enums/anime-season.enum';

export interface AnimeDetails {
  sourceId: number;
  dataSource: string;
  bannerImage: string;
  coverImage: CoverImage;
  title: Title;
  startDate: AirDate;
  endDate: AirDate;
  externalLinks: ExternalLink[];
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
  status: string;
  format: string;
  type: string;
  coverImage: CoverImage;
}

interface Title {
  english?: string;
  romaji: string;
}

interface ExternalLink {
  url: string;
  site: string;
  type: string;
  icon: null | string;
  language: null | string;
}

interface CoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

interface AirDate {
  year: number;
  month: number;
  day: number;
}
