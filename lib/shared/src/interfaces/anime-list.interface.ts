import { ICoverImage, IStudios, ITitle } from "./anime";

export interface IAnimeListItem {
  id: number;
  title: Pick<ITitle, 'romaji' >;
  coverImage: Pick<ICoverImage, 'color' | 'extraLarge'>;
  studios: IStudios[];
}
