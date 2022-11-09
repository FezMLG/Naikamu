export interface AnimePlayers {
  episode_number: number;
  players: AnimePlayer[];
}

export interface AnimePlayer {
  player_name: string;
  player_link: string;
  translator_name: string;
}
