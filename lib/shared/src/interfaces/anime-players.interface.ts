import { AnimeSource } from '../enums/anime-source.enum';

export interface AnimePlayers {
  episode_number: number;
  players: AnimePlayer[];
}

export interface AnimePlayer {
  player_name: string;
  player_link: string;
  translator_name: string;
  source_name: AnimeSource;
  source_url: string;
}
