export interface ShindenResponse {
  success: boolean;
  message: string;
  result: ShindenResult;
}

export interface ShindenResult {
  count: number;
  items: ShindenItem[];
  stats: ShindenStats;
}

export interface ShindenItem {
  titleId: number;
  watchStatus: string;
  isFavourite: number;
  dmca: number;
  title: string;
  titleType: string;
  coverId: number;
  premiereDate?: number;
  premierePrecision: number;
  finishDate?: number;
  finishPrecision: number;
  titleStatus: string;
  mpaaRating: string;
  summaryRatingTitlecahracters?: string;
  summaryRatingTotal?: string;
  summaryRatingStory?: string;
  episodes: number;
  animeType: string;
  summaryRatingMusic?: string;
  summaryRatingGraphics?: string;
  watchedEpisodesCnt: string;
  rateTotal?: number;
  rateStory?: number;
  rateGraphic?: number;
  rateMusic?: number;
  rateCharacters?: number;
  rateLine: any;
  userNote: any;
  userNoteIsPrivate: any;
  descriptionEn?: string;
  descriptionPl?: string;
}

export interface ShindenStats {
  allTitles: number;
  animeType: ShindenAnimeType;
  watchedEpisodes: number;
  watchedChapters: any;
  mpaa: ShindenMpaa;
  status: ShindenStatus;
}

export interface ShindenAnimeType {
  tv: number;
  movie: number;
  music: number;
  ona: number;
  ova: number;
  special: number;
}

export interface ShindenMpaa {
  g: number;
  pg: number;
  pg13: number;
  r: number;
  rPlus: number;
  rx: number;
  ry: number;
}

export interface ShindenStatus {
  anime: ShindenAnime;
  manga: any;
}

export interface ShindenAnime {
  finishedAiring: number;
  proposal: number;
  currentlyAiring: number;
  notYetAired: number;
}
