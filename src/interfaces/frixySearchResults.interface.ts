export interface IFrixySearchResults {
  series: IFrixySeries[];
  rows_num: number;
}

export interface IFrixySeries {
  id: string;
  shared: boolean;
  adultsonly: boolean;
  movieserie: boolean;
  title: string;
  subtitles: string[];
  description: string;
  poster: string;
  banner: string;
  status: string;
  season: Season;
  tags: string[];
  translators: string[];
  correctors: string[];
  links: Link[];
  related: any[];
  keywords: string[];
  added_at: string;
  last_edit: string;
  rating: number;
  sort_rating: number;
  link: string;
  ep_count: number;
  studio: string;
  recommended: boolean;
  requirelogin: boolean;
}

interface Link {
  name: string;
  link: string;
}

interface Season {
  season: number;
  year: number;
}
