import { AnimeSource, PlayerType } from "../enums";

export interface AnimePlayers {
  episodeNumber: number;
  players: AnimePlayer[];
}

export interface AnimePlayer {
  playerName: string;
  playerLink: string;
  translatorName: string;
  sourceName: AnimeSource;
  sourceUrl: string;
  playerType: PlayerType;
}
