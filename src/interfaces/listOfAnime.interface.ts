export interface IALListOfAnime {
  Page: Page;
}

interface Page {
  pageInfo: PageInfo;
  media: Media[];
}

export interface Media {
  id: number;
  title: Title;
  coverImage: CoverImage;
}

interface CoverImage {
  extraLarge: string;
}

interface Title {
  romaji: string;
}

interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}
