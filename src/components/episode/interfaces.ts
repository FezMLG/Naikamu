export interface IEpisode {
  id: string;
  title: string;
  description: string;
  number: number;
  banner?: string;
  players: LinkElement[];
  added_at?: string;
  last_edit?: string;
  poster: string;
}

export interface LinkElement {
  name: string;
  link: string;
}
