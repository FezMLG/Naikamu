export interface IStudios {
    name: string;
}

export interface Relation {
  relationType: string;
  id: number;
  title: ITitle;
  status: string;
  format: string;
  type: string;
  coverImage: ICoverImage;
}

export interface ITitle {
  english?: string;
  romaji: string;
}

export interface IExternalLink {
  url: string;
  site: string;
  type: string;
  icon: null | string;
  language: null | string;
}

export interface ICoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
}

export interface IAirDate {
  year: number;
  month: number;
  day: number;
}
