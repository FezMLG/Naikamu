export interface IALTitleInfo {
  Media: Media;
}

interface Media {
  id: number;
  format: string;
  status: string;
  description: string;
  startDate: EndDateClass;
  endDate: EndDateClass;
  season: string;
  seasonYear: number;
  episodes: number;
  duration: number;
  trailer: Trailer;
  genres: string[];
  averageScore: number;
  meanScore: number;
  popularity: number;
  tags: Tag[];
  nextAiringEpisode: NextAiringEpisode;
  siteUrl: string;
  title: Title;
  coverImage: CoverImage;
  bannerImage: string;
}

interface CoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

interface EndDateClass {
  year: number;
  month: number;
  day: number;
}

interface NextAiringEpisode {
  id: number;
  airingAt: number;
  episode: number;
}

interface Tag {
  id: number;
  name: string;
}

interface Title {
  english: string;
  romaji: string;
}

interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}
