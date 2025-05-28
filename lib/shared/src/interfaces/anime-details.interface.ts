import { WatchStatus, AnimeSeason } from '../enums';
import {
  IAirDate,
  ICoverImage,
  IExternalLink,
  IStudios,
  ITitle,
  Relation,
} from './anime';

export interface AnimeDetails {
  id: string;
  watchStatus: WatchStatus;
  episodesDisabled: boolean;
  episodesDisabledReason: string | null;
  sourceId: number;
  dataSource: string;
  bannerImage: string;
  coverImage: ICoverImage;
  title: ITitle;
  startDate: IAirDate;
  endDate: IAirDate;
  externalLinks: IExternalLink[];
  relations: Relation[];
  popularity: number;
  description: string;
  status: string;
  genres: string[];
  format: string;
  episodes?: number;
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
  studios: IStudios[];
}
