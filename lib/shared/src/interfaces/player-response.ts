import { PlayerType } from '../enums';

export interface IPlayerResponse {
  type: PlayerType;
  uri: string;
  status: number;
}
